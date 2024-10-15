import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('dialog') dialogEl!: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {
    this.dialogEl.nativeElement.showModal();
  }
}
