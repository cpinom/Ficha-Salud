import { Directive, EventEmitter, Input, Output } from "@angular/core";

const rotate: { [key: string]: string } = { asc: 'desc', desc: 'asc' };

@Directive({
  selector: 'th[sortable]',
  standalone: false,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class SortableHeaderDirective {
  @Input() sortable: string = '';
  @Input() direction: 'asc' | 'desc' | '' = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }

  clear() {
    this.direction = '';
  }
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}