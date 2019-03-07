import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, isDevMode, OnChanges, Output, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { translate } from '@rucken/core';
import { BindObservable } from 'bind-observable';
import { BindIoInner } from 'ngx-bind-io';
import { IModel, PaginationMeta } from 'ngx-repository';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@BindIoInner()
@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityListComponent<TModel extends IModel> implements OnChanges {

  @ContentChild('#defaultItemLabelTemplate')
  defaultItemLabelTemplate: TemplateRef<any>;
  @Input()
  itemLabelTemplate: TemplateRef<any> = undefined;

  @ContentChild('#defaultGridFieldContent')
  defaultGridFieldContent: TemplateRef<any>;
  @Input()
  gridFieldContent: TemplateRef<any> = undefined;

  @ContentChild('#defaultGridCellContent')
  defaultGridCellContent: TemplateRef<any>;
  @Input()
  gridCellContent: TemplateRef<any> = undefined;

  @ContentChild('#defaultEntityListHeaderTemplate')
  defaultEntityListHeaderTemplate: TemplateRef<any>;
  @Input()
  entityListHeaderTemplate: TemplateRef<any> = undefined;

  @ContentChild('#defaultEntityListFooterTemplate')
  defaultEntityListFooterTemplate: TemplateRef<any>;
  @Input()
  entityListFooterTemplate: TemplateRef<any> = undefined;

  @ContentChild('#defaultSearchFieldTemplate')
  defaultSearchFieldTemplate: TemplateRef<any>;
  @Input()
  searchFieldTemplate: TemplateRef<any> = undefined;

  @ContentChild('#defaultGridCellActionContent')
  defaultGridCellActionContent: TemplateRef<any>;
  @Input()
  gridCellActionContent: TemplateRef<any> = undefined;

  @ContentChild('#defaultGridCellTranslatedContent')
  defaultGridCellTranslatedContent: TemplateRef<any>;
  @Input()
  gridCellTranslatedContent: TemplateRef<any> = undefined;

  @ContentChild('#defaultGridFieldActionContent')
  defaultGridFieldActionContent: TemplateRef<any>;
  @Input()
  gridFieldActionContent: TemplateRef<any> = undefined;

  @ContentChild('#defaultGridCellTemplate')
  defaultGridCellTemplate: TemplateRef<any>;
  @Input()
  gridCellTemplate: TemplateRef<any> = undefined;

  @Input()
  viewLink: string = undefined;
  @Input()
  updateLink: string = undefined;
  @Input()
  deleteLink: string = undefined;

  @Input()
  showSearchField = false;
  @Input()
  selectFirst?: boolean = undefined;
  @Input()
  processing: boolean = undefined;
  @Input()
  searchField: FormControl = new FormControl();
  @Input()
  title: string = undefined;
  @Input()
  createTitle = translate('Create');
  @Input()
  createClass = 'btn btn-primary';
  @Input()
  translatedCells: string[] = [];
  @Input()
  orderColumns: string[] = undefined;
  @Input()
  columnsClasses: { [key: string]: string } = undefined;
  @Input()
  orderBy: string = undefined;
  @Input()
  multiSelectColumns: string[] = undefined;

  @Input()
  columns: string[] = undefined;
  @Input()
  classes: string[] = undefined;
  @Input()
  strings: any = undefined;
  @Input()
  items: TModel[] = undefined;

  @Output()
  delete: EventEmitter<TModel> = new EventEmitter<TModel>();
  @Output()
  create: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  view: EventEmitter<TModel> = new EventEmitter<TModel>();
  @Output()
  update: EventEmitter<TModel> = new EventEmitter<TModel>();
  @Output()
  dblClick: EventEmitter<TModel> = new EventEmitter<TModel>();
  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  changeOrder: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  appendFromGrid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  selected: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();
  @Output()
  changePage: EventEmitter<{
    page: number;
    itemsPerPage: number;
  }> = new EventEmitter<{ page: number; itemsPerPage: number }>();
  @Output()
  nextPage: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  readonly: boolean = undefined;
  @Input()
  enableCreate = true;
  @Input()
  enableUpdate = true;
  @Input()
  enableDelete = true;
  @Input()
  enableAppendFromGrid = true;
  @Input()
  paginationMeta: PaginationMeta = undefined;

  @BindObservable()
  parent: any = undefined;
  parent$: Observable<any>;
  @BindObservable()
  filteredItems: TModel[] = undefined;
  filteredItems$: Observable<TModel[]>;
  @BindObservable()
  filtredColumns: string[] = undefined;
  filtredColumns$: Observable<string[]>;
  @BindObservable()
  enableOnlyUpdateOrDelete: boolean = undefined;
  enableOnlyUpdateOrDelete$: Observable<boolean>;
  @BindObservable()
  enableUpdateAndDelete: boolean = undefined;
  enableUpdateAndDelete$: Observable<boolean>;
  @BindObservable()
  notReadonlyAndEnableCreate: boolean = undefined;
  notReadonlyAndEnableCreate$: Observable<boolean>;
  @BindObservable()
  notReadonlyAndEnableDelete: boolean = undefined;
  notReadonlyAndEnableDelete$: Observable<boolean>;
  @BindObservable()
  notReadonlyAndEnableUpdate: boolean = undefined;
  notReadonlyAndEnableUpdate$: Observable<boolean>;

  private _refresher: any = undefined;
  private _processingModal: any = undefined;
  private _selected: TModel[] = undefined;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _loadingController: LoadingController,
    private _translateService: TranslateService
  ) {
    this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => this.onSearch(value));
  }
  ngOnChanges(changes: SimpleChanges) {
    this.calcParent();
    this.calcEnableCreate();
    this.calcEnableDelete();
    this.calcEnableUpdate();
    this.calcEnableOnlyUpdateOrDelete();
    this.calcEnableUpdateAndDelete();
    this.calcEnableAppendFromGrid();
    if (changes.processing) {
      this.calcProcessing();
    }
    if (changes.columns || changes.readonly || changes.enableDelete || changes.enableUpdate) {
      this.setColumns(this.columns);
    }
    if (changes.items) {
      this.setItems(this.items);
    }
  }
  calcProcessing() {
    if (this._processingModal !== null) {
      if (this._processingModal === undefined) {
        this._processingModal = null;
        if (this.processing) {
          this._loadingController.create({
            message: this._translateService.instant('Loading...')
          }).then(element => {
            element.present().then(_ => {
              this._processingModal = element;
              if (this.processing === false) {
                this.processing = false;
                this.calcProcessing();
              }
            });
          });
        }
      } else {
        if (!this.processing) {
          this._processingModal.dismiss().then(() => {
            this._processingModal = undefined;
          });
        }
      }
    }
  }
  calcEnableOnlyUpdateOrDelete() {
    this.enableOnlyUpdateOrDelete =
      (
        this.notReadonlyAndEnableDelete &&
        !this.notReadonlyAndEnableUpdate
      ) || (
        !this.notReadonlyAndEnableDelete &&
        this.notReadonlyAndEnableUpdate
      );
  }
  calcEnableUpdateAndDelete() {
    this.enableUpdateAndDelete =
      this.notReadonlyAndEnableDelete &&
      this.notReadonlyAndEnableUpdate;
  }
  calcEnableAppendFromGrid() {
    this.enableAppendFromGrid = !this.readonly && this.enableAppendFromGrid;
  }
  calcEnableCreate() {
    this.notReadonlyAndEnableCreate = !this.readonly && this.enableCreate;
  }
  calcEnableDelete() {
    this.notReadonlyAndEnableDelete = !this.readonly && this.enableDelete;
  }
  calcEnableUpdate() {
    this.notReadonlyAndEnableUpdate = !this.readonly && this.enableUpdate;
  }
  setColumns(columns: string[]) {
    this.filtredColumns =
      (columns || []).filter(column =>
        column === 'action'
          ? (
            this.readonly === true || (
              !this.readonly &&
              !this.enableDelete &&
              !this.enableUpdate
            )
              ? false
              : true
          )
          : true
      );
  }
  setItems(items: TModel[]) {
    this.filteredItems = items;
    if (
      this.selectFirst !== false &&
      items &&
      items.length &&
      items.filter(item => this._selected && this._selected.length && this._selected[0].id === item.id).length === 0
    ) {
      this.onSelected([]);
    }
    if (this._refresher && this._refresher.target) {
      this._refresher.target.complete();
    }
  }
  calcParent(): any {
    if (this._viewContainerRef) {
      this.parent = this._viewContainerRef['_view'].component;
    }
  }
  onChangeOrder(column: string) {
    if (this.orderBy === `${column}`) {
      this.orderBy = `-${column}`;
    } else {
      this.orderBy = `${column}`;
    }
    this.changeOrder.emit(this.orderBy);
  }
  onChangePage(meta: { page: number; itemsPerPage: number }) {
    if (isDevMode() && this.changePage.observers.length === 0) {
      console.warn('No subscribers found for "onChangePage"', this.parent);
    }
    this.changePage.emit(meta);
  }
  onRefresh(event) {
    this._refresher = event;
    this.onSearch(this.searchField.value);
  }
  onNextPage(event) {
    if (isDevMode() && this.changePage.observers.length === 0) {
      console.warn('No subscribers found for "onNextPage"', this.parent);
    }
    if (event.target && event.target.complete) {
      if (this.paginationMeta.totalResults > this.items.length) {
        setTimeout(
          () =>
            event.target.complete()
          ,
          700
        );
        this.nextPage.emit(true);
      } else {
        event.target.complete();
      }
    }
  }
  onSearch(text: string) {
    if (isDevMode() && this.search.observers.length === 0) {
      console.warn('No subscribers found for "search"', this.parent);
    }
    this.search.emit(text);
  }
  onDelete(item: TModel, callback?: () => void) {
    if (isDevMode() && !this.notReadonlyAndEnableDelete) {
      console.warn('Delete action is disabled', this.parent);
    }
    if (isDevMode() && this.delete.observers.length === 0) {
      console.warn('No subscribers found for "delete"', this.parent);
    }
    if (callback) {
      setTimeout(() => callback(), 700);
    }
    this.delete.emit(item);
  }
  onUpdate(item: TModel, callback?: () => void) {
    if (isDevMode() && !this.notReadonlyAndEnableUpdate) {
      console.warn('Update action is disabled', this.parent);
    }
    if (isDevMode() && this.update.observers.length === 0) {
      console.warn('No subscribers found for "update"', this.parent);
    }
    if (callback) {
      setTimeout(() => callback(), 700);
    }
    this.update.emit(item);
  }
  onCreate() {
    if (isDevMode() && !this.notReadonlyAndEnableCreate) {
      console.warn('Create action is disabled', this.parent);
    }
    if (isDevMode() && this.create.observers.length === 0) {
      console.warn('No subscribers found for "create"', this.parent);
    }
    this.create.emit();
  }
  onView(item: TModel, callback?: () => void) {
    if (isDevMode() && this.view.observers.length === 0) {
      console.warn('No subscribers found for "view"', this.parent);
    }
    if (callback) {
      setTimeout(() => callback(), 700);
    }
    this.view.emit(item);
  }
  onDblClick(item: TModel) {
    if (this.dblClick.observers.length > 0) {
      this.dblClick.emit(item);
    } else {
      if (isDevMode() && this.dblClick.observers.length === 0) {
        console.warn('No subscribers found for "dblClick"', this.parent);
      }
      if (this.readonly === true || !this.notReadonlyAndEnableUpdate) {
        if (isDevMode() && this.dblClick.observers.length === 0) {
          console.warn('Try call "view" for "dblClick"', this.parent);
        }
        this.onView(item);
      } else {
        if (isDevMode() && this.dblClick.observers.length === 0) {
          console.warn('Try call "update" for "dblClick"', this.parent);
        }
        this.onUpdate(item);
      }
    }
  }
  onAppendFromGrid() {
    if (isDevMode() && !this.enableAppendFromGrid) {
      console.warn('Append from grid action is disabled', this.parent);
    }
    if (isDevMode() && this.appendFromGrid.observers.length === 0) {
      console.warn('No subscribers found for "appendFromGrid"', this.parent);
    }
    this.appendFromGrid.emit(true);
  }
  clearSelected() {
    this._selected = [];
  }
  onSelected(items: TModel[]) {
    if (this.selectFirst !== false && items && items.length === 0 && this.items && this.items.length) {
      items = [this.items[0]];
    }
    this._selected = items;
    if (this.selected) {
      this.selected.emit(items);
    }
  }
  trackByFn(index: any, item: { id: any; }) {
    return item.id;
  }
  isSelected(item: TModel) {
    const index = this._selected.findIndex(eachItem => eachItem && item && eachItem.id === item.id);
    return index !== -1;
  }
  toggle(item: TModel, col: string) {
    if (!this.multiSelectColumns || this.multiSelectColumns.indexOf(col) === -1) {
      this._selected = [];
    }
    const selected = this._selected ? this._selected : [];
    const index = selected.findIndex(eachItem => eachItem && item && eachItem.id === item.id);
    if (index === -1) {
      selected.push(item);
    } else {
      selected.splice(index, 1);
    }
    this.onSelected(selected);
  }
  isAllSelected() {
    const numSelected = this._selected ? this._selected.length : -1;
    const numRows = this.items ? this.items.length : 0;
    return numSelected === numRows;
  }
  masterToggle() {
    let selected = this._selected;
    if (this.isAllSelected()) {
      selected = [];
    } else {
      selected = [...this.items];
    }
    this.onSelected(selected);
  }
}
