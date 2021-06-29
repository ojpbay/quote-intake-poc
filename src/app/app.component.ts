import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Quote Intake';
  gridColumns = 4;
  filterForm: FormGroup;
  uniqueMarkets: any[];
  selectedResponse: any;
  responseTypes: any[] = [
    { id: 1, name: 'Quote' },
    { id: 2, name: 'Declination' },
    { id: 3, name: 'Update' }
  ];
  responses: any[] = [
    {
      id: 1,
      responseTypeId: 1,
      marketId: 1,
      marketName: 'Market #1',
      underwriterName: 'Joe Smith',
      underwriterEmail: 'joe.smith@underwriter.com',
      premium: 150000,
      productId: 1,
      quoteName: 'Quote ABC'
    },
    {
      id: 2,
      responseTypeId: 1,
      marketId: 1,
      marketName: 'Market #1',
      underwriterName: 'Joe Smith',
      underwriterEmail: 'joe.smith@underwriter.com',
      premium: 1750000,
      additionalPolicyCost: 5000,
      productId: 1,
      quoteName: 'Quote DEF'
    },
    {
      id: 3,
      responseTypeId: 1,
      marketId: 2,
      marketName: 'Market #2',
      underwriterName: 'Fred Allen',
      underwriterEmail: 'fred.allen@another-underwriter.com',
      premium: 15000000,
      productId: 2,
      quoteName: 'Quote GHI'
    },
    {
      id: 4,
      responseTypeId: 1,
      marketId: 3,
      marketName: 'Market #3',
      premium: 1000000,
      additionalPolicyCost: 10000,
      productId: 3,
      quoteName: 'Quote JKL'
    },
    {
      id: 5,
      responseTypeId: 2,
      marketId: 2,
      marketName: 'Market #2',
      underwriterName: 'Fred Allen',
      underwriterEmail: 'fred.allen@another-underwriter.com',
      quoteName: 'Quote MNO'
    },
    {
      id: 6,
      responseTypeId: 3,
      marketId: 4,
      marketName: 'Market #4',
      quoteName: 'Quote PQR'
    },
    {
      id: 7,
      responseTypeId: 2,
      marketId: 5,
      marketName: 'Market #5',
      quoteName: 'Quote STU'
    },
    {
      id: 8,
      responseTypeId: 1,
      marketId: 5,
      marketName: 'Market #5',
      premium: 250000,
      productId: 3,
      quoteName: 'Quote VWX'
    }
  ];
  filteredResponses: any[];
  quoteDrawerOpen = false;
  @ViewChild('quickQuoteDrawer', { static: true }) quickQuoteDrawer: MatDrawer;

  constructor(private readonly formbuilder: FormBuilder) {}

  ngOnInit() {
    this.buildFilterForm();

    this.uniqueMarkets = this.responses.reduce((acc, cur) => {
      const market = {
        id: cur.marketId,
        name: cur.marketName
      };

      const existing = acc.find(x => x.id === market.id);
      if (existing === undefined) {
        acc.push(market);
      }

      return acc;
    }, []);

    this.filteredResponses = this.responses;
    this.filterForm.valueChanges.subscribe(values => {
      this.filteredResponses = this.responses;

      if (values.responseTypeId !== -1) {
        this.filteredResponses = this.filteredResponses.filter(
          r => r.responseTypeId === values.responseTypeId
        );
      }

      if (values.marketId !== -1) {
        this.filteredResponses = this.filteredResponses.filter(
          r => r.marketId === values.marketId
        );
      }
    });
  }

  private buildFilterForm() {
    this.filterForm = this.formbuilder.group({
      responseTypeId: -1,
      productId: -1,
      marketId: -1
    });
  }

  resetFilters() {
    this.filterForm.controls['responseTypeId'].setValue(-1);
    this.filterForm.controls['productId'].setValue(-1);
    this.filterForm.controls['marketId'].setValue(-1);
  }

  closeQuickResponseDrawer(value: boolean) {
    this.quoteDrawerOpen = value;
    this.quickQuoteDrawer.toggle();
  }

  addResponse(response: any) {
    this.responses.push(response);
  }

  editResponse(responseId: number) {
    const response = this.responses.find(r => r.id === responseId);
    if (response) {
      this.selectedResponse = response;
    }
  }

  deleteResponse(id: number) {
    const responseToDelete = this.filteredResponses.find(r => r.id === id);
    if (responseToDelete) {
      const index = this.filteredResponses.indexOf(responseToDelete);
      this.filteredResponses.splice(index, 1);

      if (this.selectedResponse === responseToDelete) {
        this.selectedResponse = null;
      }
    }
  }

  public get flexPercentage(): string {
    if (this.quoteDrawerOpen) {
      return 'calc(${100%-500px)/this.gridColumns' + '%';
    } else {
      return 100 / this.gridColumns + '%';
    }
  }
}
