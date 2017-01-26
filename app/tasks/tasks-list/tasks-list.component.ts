import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { ApiService } from '../../shared/api.service'
import { Task } from '../../shared/task'


@Component({
    selector: "tasks-list",
    templateUrl: './tasks/tasks-list/tasks-list.component.html',
    styleUrls: ["./tasks/tasks-list/tasks-list.component.css"]
})
export class TasksListComponent implements OnInit, AfterViewInit {

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;
    public tasks: Task[] = [];
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
        let microchips;
        this.apiService.getMicrochips().subscribe(
            data => microchips = data._items,
            err => {
                error = true;
                console.log('Error:', err);
            },
            () => {
                if (!error) {
                    for (let microchip of microchips) {
                        if (microchip.tasks) {
                            for (let task of microchip.tasks) {
                                this.tasks.push(task);
                            }
                        }
                    }
                }
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
}
