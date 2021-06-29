import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.scss']
})
export class ResponseCardComponent implements OnInit {
  @Input() response: any;
  @Output() deleteResponseEvent = new EventEmitter<number>();
  @Output() editResponseEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  deleteResponse(id: number) {
    this.deleteResponseEvent.emit(id);
  }

  editResponse(id: number) {
    this.editResponseEvent.emit(id);
  }
}
