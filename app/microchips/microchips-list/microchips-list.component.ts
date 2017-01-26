import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, OnInit } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { Microchip } from "../../shared/microchip";
import { ApiService } from "../../shared/api.service";


@Component({
    selector: "microchips",
    templateUrl: './microchips/microchips-list/microchips-list.component.html',
    styleUrls: ["./microchips/microchips-list/microchips-list.component.css"]
})
export class MicrochipsListComponent implements OnInit, AfterViewInit {

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;
    public microchips: Microchip[];
    public pages;

    constructor(private apiService: ApiService, private _changeDetectionRef: ChangeDetectorRef) {

        this.pages = [
            { name: ' Tasks', icon: String.fromCharCode(0xf0ae), route: '/tasks' },
            { name: ' Reports', icon: String.fromCharCode(0xf0f6), route: '/reports' },
            { name: ' Microchips', icon: String.fromCharCode(0xf2db), route: '/microchips' }
        ];

    }

    ngOnInit() {
        let error: boolean = false;
        this.apiService.getMicrochips().subscribe(
            data => this.microchips = data._items,
            err => {
                error = true;
                console.log('Error:', err);
            },
            () => {
                // if (!error) {
                //     for (let microchip of microchips) {
                //         // this.tasks.push(microchip.tasks);
                //         // console.log('microchip', microchip);
                //         if (microchip.tasks) {
                //             for (let task of microchip.tasks) {
                //                 // console.log(task);
                //                 this.tasks.push(task);
                //             }
                //         }
                //     }
                // }
            }
        );
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    public toggleDrawer() {
        this.drawer.toggleDrawerState();
    }

    // onTap(args) {
    //     console.log(args.index);
    //     console.log(this.items[args.index].name);
    // }

}