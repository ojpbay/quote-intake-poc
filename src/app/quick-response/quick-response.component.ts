import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-quick-response',
  templateUrl: './quick-response.component.html',
  styleUrls: ['./quick-response.component.scss']
})
export class QuickResponseComponent implements OnInit {
  @Input() response: any;
  availableMarkets: any[] = [
    {
      id: 1,
      name: 'Market #1'
    },
    {
      id: 2,
      name: 'Market #2'
    },
    {
      id: 3,
      name: 'Market #3'
    },
    {
      id: 4,
      name: 'Market #4'
    },
    {
      id: 5,
      name: 'Market #5'
    },
    {
      id: 6,
      name: 'Market #6'
    },
    {
      id: 7,
      name: 'Market #7'
    },
    {
      id: 8,
      name: 'Market #8'
    }
  ];

  products: any[] = [
    {
      id: 1,
      name: 'Prod #1'
    },
    {
      id: 2,
      name: 'Prod #2'
    },
    {
      id: 3,
      name: 'Prod #3'
    },
    {
      id: 4,
      name: 'Prod #4'
    }
  ];

  responseForm: FormGroup;
  @Output() closeQuickResponseDrawerEvent = new EventEmitter<boolean>();
  @Output() addResponseEvent = new EventEmitter<any>();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    this.buildForm();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.responseForm = this.formBuilder.group({
      marketId: [
        this.response ? this.response.marketId : null,
        Validators.required
      ],
      responseTypeId: [
        this.response ? this.response.responseTypeId : null,
        Validators.required
      ],
      productId: [
        this.response ? this.response.productId : null,
        Validators.required
      ],
      underwriterName: [this.response ? this.response.underwriterName : ''],
      underwriterEmail: [this.response ? this.response.underwriterEmail : ''],
      quoteName: [
        this.response ? this.response.quoteName : '',
        Validators.required
      ],
      premium: [this.response ? this.response.premium : null],
      additionalPolicyCost: [
        this.response ? this.response.additionalPolicyCost : null
      ],
      comments: [this.response ? this.response.comments : '']
    });
  }

  closeQuickResponse() {
    this.closeQuickResponseDrawerEvent.emit(true);
  }

  addResponse() {
    // just to get market name to populate for display
    const market = this.getMarketName(
      this.responseForm.controls['marketId'].value
    );
    let response = this.responseForm.value;
    if (market) {
      response = {
        ...response,
        marketName: market.name
      };
    }

    this.addResponseEvent.emit(response);
  }

  private getMarketName(marketId: number) {
    return this.availableMarkets.find(m => m.id === marketId);
  }
}
