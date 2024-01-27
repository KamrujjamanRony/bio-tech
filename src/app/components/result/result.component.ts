import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FormsModule } from '@angular/forms';
import { Input, initTE, Select, Collapse } from 'tw-elements';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MainUIModel } from '../../features/model/MainUI.model';
import { Observable, Subscription } from 'rxjs';
import { MainUIService } from '../../features/services/main-ui.service';
import { SealModel } from '../../features/model/Seal.model';
import { SealService } from '../../features/services/seal.service';
import { environment } from '../../../environments/environments';
import { MarginService } from '../../features/services/margin.service';
import { MarginModel } from '../../features/model/Margin.model';
import { CommentService } from '../../features/services/comment.service';
import { AdviceService } from '../../features/services/advice.service';
import { CommentModel } from '../../features/model/Comment.model';
import { AdviceModel } from '../../features/model/Advice.model';
import { AuthService } from '../../features/services/auth.service';
import { DoctorModel } from '../../features/model/Doctor.model';
import { DoctorService } from '../../features/services/doctor.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, FormsModule, RouterLink],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit, OnDestroy {
  id: string | null = null;
  mainUI?: MainUIModel;
  margin$?: Observable<MarginModel | undefined>;
  margin?: string;
  marginId?: string;
  seals$?: Observable<SealModel[]>;
  seals?: SealModel[];
  comments$?: Observable<CommentModel[]>;
  comment!: any;
  commentCode!: any;
  advices$?: Observable<AdviceModel[]>;
  advice!: any;
  adviceCode!: any;
  refDoctor$?: Observable<DoctorModel[]>;
  refDoctor!: any;
  refDoctorCode!: any;
  leftSeals?: SealModel;
  middleSeals?: SealModel;
  rightSeals?: SealModel;
  paramsSubscription?: Subscription;
  addMarginSubscription?: Subscription;
  editMarginSubscription?: Subscription;
  chartOptions: any;
  date: any;
  currentDate?: string;
  companyID: any;
  Company$?: Observable<any[]>;
  Company: any = '';
  loading: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private marginService: MarginService,
    private sealService: SealService,
    private commentService: CommentService,
    private adviceService: AdviceService,
    private mainUIService: MainUIService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.companyID = this.authService.getCompanyID();

    // get All Company
    if (!this.Company$) {
      this.Company$ = authService.getCompanyById(this.companyID);
      this.Company$.subscribe((data) => {
        this.Company = data[0];
      });
    }
    this.currentDate = this.getCurrentDate();
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.mainUIService.getMainUI(this.id).subscribe({
            next: (response) => {
              this.mainUI = response;
              this.commentCode = response.comCode;
              this.adviceCode = response.advCode;
              this.refDoctorCode = response.refCode;
              this.updateChartData();

              // ----------get Ref Doctor--------------
              if (!this.refDoctor$) {
                this.refDoctor$ = doctorService.getCompanyDoctors(
                  this.companyID
                );
                this.refDoctor$.subscribe((data) => {
                  this.refDoctor = data.find(
                    (a) => a.code == this.refDoctorCode
                  );
                });
              }
              // ----------get target Comment--------------
              if (!this.comments$) {
                this.comments$ = commentService.getCompanyComment(
                  this.companyID
                );
                this.comments$.subscribe((data) => {
                  this.comment = data.find((a) => a.code == this.commentCode);
                });
              }
              // --------get target Advice-----------
              if (!this.advices$) {
                this.advices$ = adviceService.getCompanyAdvice(this.companyID);
                this.advices$.subscribe((advices) => {
                  this.advice = advices.find((a) => a.code == this.adviceCode);
                });
              }

              // get margin
              if (!this.margin$) {
                this.margin$ = marginService.getCompanyMargin(this.companyID);
                this.margin$.subscribe((data) => {
                  if (data) {
                    this.margin = data.code;
                    this.marginId = data.id;
                    this.loading = true;
                  }
                });
              }
            },
          });
        }
      },
    });

    // get All Seals
    if (!this.seals$) {
      this.seals$ = sealService.getCompanySeals(this.companyID);
      this.seals$.subscribe((seals) => {
        this.leftSeals = seals.find((a) => a.position == '1');
        this.middleSeals = seals.find((a) => a.position == '2');
        this.rightSeals = seals.find((a) => a.position == '3');
        this.seals = seals;
      });
    }
  }

  // Set Date format
  transformDate(dateString: any): any {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  // Set Current Date format
  getCurrentDate(): any {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'dd-MM-yyyy');
  }

  // Set Chart Data
  private updateChartData() {
    // The chart start position
    this.chartOptions = {
      animationEnabled: true,
      height: 300,
      title: {
        text: 'Haemoglobin Electrophoresis',
        fontFamily: "tahoma",
        fontWeight: "bold",
        fontColor: "red",
        fontSize: 14,
      },
      axisY: {
        title: 'Area',
        gridColor: 'lightGray',
        // maximum: 115,
        interval: 10,
      },
      axisX: {
        title: 'Time',
        interval: 50,
        viewportMinimum: 0,
        viewportMaximum: 310,
      },
      toolTip: {
        shared: true,
      },
      legend: {
        fontSize: 9,
      },
      data: [
        {
          type: 'splineArea',
          indexLabelFontSize: 9,
          name: 'Hb Barts',
          markerSize: 0,
          color: 'rgba(144,170,112,.7)',
          dataPoints: [
            { x: -30000, y: 0 },
            { x: 10, y: 0 },
            {
              x: 20,
              y: this.mainUI?.hbBarts,
              indexLabel: "Hb Barts",
              indexLabelFontWeight: 'bolder',
              indexLabelFontSize: 14,
            },
            { x: 30, y: 0 },
            { x: 30000, y: 0 },
          ],
        },
        {
          type: 'splineArea',
          indexLabelFontSize: 9,
          name: 'Hb F',
          markerSize: 0,
          color: 'rgba(44,190,142,.7)',
          dataPoints: [
            { x: -30000, y: 0 },
            { x: 40, y: 0 },
            {
              x: 50,
              y: this.mainUI?.hbF,
              indexLabel: "Hb F",
              indexLabelFontWeight: 'bolder',
              indexLabelFontSize: 14,
              // indexLabelMaxWidth: 35,
            },
            { x: 60, y: 0 },
            { x: 30000, y: 0 },
          ],
        },
        {
          type: 'splineArea',
          indexLabelFontSize: 9,
          name: 'Hb J',
          markerSize: 0,
          color: 'rgba(231, 186, 25,.7)',
          dataPoints: [
            { x: -30000, y: 0 },
            { x: 80, y: 0 },
            {
              x: 90,
              y: this.mainUI?.hbJ,
              indexLabel: "Hb J",
              indexLabelFontWeight: 'bolder',
              indexLabelFontSize: 14,
              // indexLabelMaxWidth: 35,
            },
            { x: 100, y: 0 },
            { x: 30000, y: 0 },
          ],
        },
        {
          type: 'splineArea',
          indexLabelFontSize: 9,
          name: 'hb A',
          markerSize: 0,
          color: 'rgba(60,236,80,.7)',
          dataPoints: [
            { x: -30000, y: 0 },
            { x: 120, y: 0 },
            {
              x: 130,
              y: this.mainUI?.hbA,
              indexLabel: "Hb A",
              indexLabelFontWeight: 'bolder',
              indexLabelFontSize: 14,
              // indexLabelMaxWidth: 35,
            },
            { x: 140, y: 0 },
            { x: 30000, y: 0 },
          ],
        },
        {
          type: 'splineArea',
          indexLabelFontSize: 9,
          name: 'hb Lepore',
          markerSize: 0,
          color: 'rgba(74,138,193,.7)',
          dataPoints: [
            { x: -30000, y: 0 },
            { x: 150, y: 0 },
            {
              x: 160,
              y: this.mainUI?.hbL,
              indexLabel: "Hb L",
              indexLabelFontWeight: 'bolder',
              indexLabelFontSize: 14,
              // indexLabelMaxWidth: 35,
            },
            { x: 170, y: 0 },
            { x: 30000, y: 0 },
          ],
        },
        {
          type: 'splineArea',
          indexLabelFontSize: 9,
          name: 'Hb E',
          markerSize: 0,
          color: 'rgba(44, 62, 80,.7)',
          dataPoints: [
            { x: -30000, y: 0 },
            { x: 190, y: 0 },
            {
              x: 200,
              y: this.mainUI?.hbE,
              indexLabel: "Hb E",
              indexLabelFontWeight: 'bolder',
              indexLabelFontSize: 14,
              // indexLabelMaxWidth: 35,
            },
            { x: 210, y: 0 },
            { x: 30000, y: 0 },
          ],
        },
        {
          type: 'splineArea',
          indexLabelFontSize: 9,
          name: 'Hb A2',
          markerSize: 0,
          color: 'rgba(124,10,206,.7)',
          dataPoints: [
            { x: -30000, y: 0 },
            { x: 220, y: 0 },
            {
              x: 230,
              y: this.mainUI?.hbA2,
              indexLabel: "Hb A2",
              indexLabelFontWeight: 'bolder',
              indexLabelFontSize: 14,
              // indexLabelMaxWidth: 35,
            },
            { x: 240, y: 0 },
            { x: 30000, y: 0 },
          ],
        },
        {
          type: 'splineArea',
          indexLabelFontSize: 9,
          name: 'Hb D',
          markerSize: 0,
          color: 'rgba(154,100,66,.7)',
          dataPoints: [
            { x: -30000, y: 0 },
            { x: 250, y: 0 },
            {
              x: 260,
              y: this.mainUI?.hbD,
              indexLabel: "Hb D",
              indexLabelFontWeight: 'bolder',
              indexLabelFontSize: 14,
              // indexLabelMaxWidth: 35,
            },
            { x: 270, y: 0 },
            { x: 30000, y: 0 },
          ],
        },
        {
          type: 'splineArea',
          indexLabelFontSize: 9,
          name: 'hb S',
          markerSize: 0,
          color: 'rgba(203, 117, 213,.7)',
          dataPoints: [
            { x: -30000, y: 0 },
            { x: 280, y: 0 },
            {
              x: 290,
              y: this.mainUI?.hbS,
              indexLabel: "Hb S",
              indexLabelFontWeight: 'bolder',
              indexLabelFontSize: 14,
              // indexLabelMaxWidth: 35,
            },
            { x: 300, y: 0 },
            { x: 30000, y: 0 },
          ],
        },
      ],
    };
    // The chart ends
  }

  ngOnInit() {
    initTE({ Input, Select, Collapse }, { allowReinits: true });
  }

  // update Margin by id
  onMarginChange(id: any) {
    const marginData = new FormData();
    marginData.append('CompanyID', this.companyID.toString() || '');
    marginData.append('Code', this.margin || '');
    if (id) {
      this.editMarginSubscription = this.marginService
        .updateMargin(id, marginData)
        .subscribe({
          next: () => {},
        });
    } else {
      this.addMarginSubscription = this.marginService
        .addMargin(marginData)
        .subscribe({
          next: () => {},
        });
    }
  }

  //============================= Util =============================
  logOut(): void {
    this.authService.deleteCompanyID();
    window.location.reload();
  }

  // Function to print the page
  isPrinting: boolean = false;
  printPage() {
    this.isPrinting = true;
    setTimeout(() => {
      window.print();
      // Reset the printing state after printing is complete
      setTimeout(() => {
        this.isPrinting = false;
      }, 1000); // Adjust the delay as needed
    }, 100); // Adjust the delay as needed
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.addMarginSubscription?.unsubscribe();
    this.editMarginSubscription?.unsubscribe();
  }
}
