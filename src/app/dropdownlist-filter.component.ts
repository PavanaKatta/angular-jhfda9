import { Component, Input } from '@angular/core';
import {
  FilterService,
  BaseFilterCellComponent,
} from '@progress/kendo-angular-grid';

/**
 * NOTE: Interface declaration here is for demo compilation purposes only!
 * In the usual case include it as an import from the data query package:
 *
 * import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
 */
interface CompositeFilterDescriptor {
  logic: 'or' | 'and';
  filters: Array<any>;
}

@Component({
  selector: 'my-dropdown-filter',
  template: `
    

    <kendo-textbox [style.width.px]="300"
  
    (ngModelChange)="onChange($event)" [(ngModel)]="lastName"
     placeholder="Try here.." [clearButton]="true">
    </kendo-textbox>
 
  `,
})
export class DropDownListFilterComponent extends BaseFilterCellComponent {
  //   public get selectedValue() {
  //     debugger;
  //     const filter = this.filterByField(this.valueField);
  //     return filter ? filter.value : null;
  //   }

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: unknown[];
  @Input() public textField: string;
  @Input() public valueField: string;

  lastName = '';

  public get defaultItem(): { [Key: string]: unknown } {
    return {
      [this.textField]: 'Select item...',
      [this.valueField]: null,
    };
  }

  constructor(filterService: FilterService) {
    super(filterService);
  }

  public onChange(value): void {
    // debugger;
    // this.applyFilter(
    //   value === null // value of the default item
    //     ? this.removeFilter(this.valueField) // remove the filter
    //     : this.updateFilter({
    //         // add a filter for the field with the value
    //         field: this.valueField,
    //         operator: 'contains',
    //         value: value,
    //       })
    // );
    debugger;
    this.filter = this.removeFilter(this.valueField);

    const filters = [];

    filters.push({
      field: this.valueField,
      operator: 'eq',
      value: value,
    });

    const root: CompositeFilterDescriptor = this.filter || {
      logic: 'and',
      filters: [],
    };

    if (filters.length) {
      root.filters.push(...filters);
    }

    this.filterService.filter(root);
  }

  nameChanged(arg) {
    alert('modelchanged ' + arg);
  }
}
