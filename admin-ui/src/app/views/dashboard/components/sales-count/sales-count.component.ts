import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ReportService } from '../../../../shared/report/report.service';

@Component({
  selector: 'app-sales-count',
  templateUrl: './sales-count.component.html',
  styleUrls: ['./sales-count.component.css']
})
export class SalesCountComponent implements OnInit {

  donutLoading = false;
  barLoading = false;
  totalPOSCount: number = 0;
  totoalOrdersCount: number = 0;
  totalCustomers: number = 0;

  totalMessageCount: number = 0;
  totalGmailCount: number = 0;
  msgSentToday: number = 0;
  mailSentToday: number = 0;

  //DUMMY DATA FOR CHART DESIGN IN BACKGROUND
  public brandBoxChartData1: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [77, 34, 35, 23, 56, 22, 93],
      label: 'Google+'
    }
  ];
  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';

  // Doughnut
  public doughnutChartLabels: string[] = ['In-Store Sales Today', 'Online Sales Today'];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#20a8d8', '#ffc107', 'rgba(148,159,177,0.2)']
    // borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)']
  }];
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[];//['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartColors: Array < any > = [
  ];
  public barChartData: any[] = new Array();
  // [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Online Sales'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'In-Store Sales'}
  // ];

  weeklyReportGenrated = false;

  downloadURl;

  constructor(private reportService: ReportService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.donutLoading = true;
    this.reportService.getDashboardReport()
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.totalPOSCount = resp.data.totalPosCount;
                          this.totalGmailCount = resp.data.totalEmailCount;
                          this.totalMessageCount = resp.data.totalSmsCount;
                          this.totoalOrdersCount = resp.data.totalOnlineCount;
                          this.mailSentToday = resp.data.emailCountToday;
                          this.msgSentToday = resp.data.totalSmsCount;
                          this.doughnutChartData.push(resp.data.posCountToday);
                          this.doughnutChartData.push(resp.data.onlineCountToday);
                          this.totalCustomers = resp.data.totalCustomers;
                        }
                        else{

                        }
                        this.donutLoading = false;
                      },
                      (error: any) => {
                        alert("Something went wrong!");
                        this.donutLoading = false;
                      })
  }

  generateReport(){
    this.barLoading = true;
    this.reportService.getDashboardweeklyReport()
                      .subscribe((resp:any) => {
                        if(resp.statusCode === 200){
                          this.barChartLabels = resp.dataList[0].reverse();
                          this.barChartData[0] = {
                            data: resp.dataList[1].reverse(),
                            label: 'In-Store Sales'
                          }
                          this.barChartData[1] = {
                            data: resp.dataList[2].reverse(),
                            label: 'Online Sales'
                          }
                          this.weeklyReportGenrated = true;
                        }
                        this.barLoading = false;
                      },
                      (error: any) => {
                        alert("Something went wrong!");
                        this.barLoading = false;
                      })
  }

  downloadReport(){
    this.donutLoading = true;
    this.reportService.getExcelFile()
                      .subscribe((resp: any) => {
                          const blob = new Blob([resp], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                          const url= window.URL.createObjectURL(blob);
                          window.open(url);
                          this.donutLoading = false;
                        },
                      (error) => {
                        alert("Something went wrong!");
                      });
  }

}
