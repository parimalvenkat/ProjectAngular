import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TenantDetails } from './tenant-details.model';
import { TenantDetailsService } from './tenant-details.service';

@Component({
    selector: 'jhi-tenant-details-detail',
    templateUrl: './tenant-details-detail.component.html'
})
export class TenantDetailsDetailComponent implements OnInit, OnDestroy {

    tenantDetails: TenantDetails;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tenantDetailsService: TenantDetailsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTenantDetails();
    }

    load(id) {
        this.tenantDetailsService.find(id).subscribe((tenantDetails) => {
            this.tenantDetails = tenantDetails;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTenantDetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tenantDetailsListModification',
            (response) => this.load(this.tenantDetails.id)
        );
    }
}
