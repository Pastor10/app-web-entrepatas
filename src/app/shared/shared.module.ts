import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import {TooltipModule} from 'ng2-tooltip-directive';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";

import {NgxsModule} from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/primeng';


@NgModule({
    imports: [
        AutoCompleteModule,
        CalendarModule,
        CardModule,
        CheckboxModule,
        ConfirmDialogModule,
        DataViewModule,
        DialogModule,
        FileUploadModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        ListboxModule,
        PaginatorModule,
        PanelModule,
        PasswordModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        TableModule,
        TabViewModule,
        ToastModule,
        TooltipModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxSpinnerModule,
        FieldsetModule,
        MultiSelectModule,
        CarouselModule,
        CommonModule,
        FormsModule,
        NgxsModule.forRoot()
    ],
    exports: [
        AutoCompleteModule,
        CalendarModule,
        CardModule,
        CheckboxModule,
        ConfirmDialogModule,
        DataViewModule,
        DialogModule,
        FileUploadModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        ListboxModule,
        PaginatorModule,
        PanelModule,
        PasswordModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        TableModule,
        TabViewModule,
        ToastModule,
        TooltipModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxSpinnerModule,
        FieldsetModule,
        MultiSelectModule,
        CarouselModule,
        CommonModule,
        FormsModule,
        ChartModule
        //NgxsModule.forRoot()
    ]

})
export class SharedModule { }
