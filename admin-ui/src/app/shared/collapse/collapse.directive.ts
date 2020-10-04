import {
  AfterViewChecked,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Renderer2
} from '@angular/core';

import {
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  animate,
  style } from '@angular/animations';

@Directive({
  selector: '[collapse]',
  exportAs: 'bs-collapse',
  host: {
    '[class.ngx-collapse]': 'true'
  }
})
export class CollapseDirective implements AfterViewChecked {
  /** This event fires as soon as content collapses */
  @Output() collapsed: EventEmitter<any> = new EventEmitter();
  /** This event fires as soon as content becomes visible */
  @Output() expanded: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.display') display: string;
  // shown
  @HostBinding('class.in')
  @HostBinding('class.ngx-show')
  @HostBinding('attr.aria-expanded')
  _collapse = true;
  // hidden
  @HostBinding('attr.aria-hidden') isCollapsed = false;
  // stale state
  @HostBinding('class.ngx-collapse') isCollapse = true;
  // animation state
  @HostBinding('class.ngx-collapsing') isCollapsing = false;

  /** A flag indicating visibility of content (shown or hidden) */
  @Input()
  set collapse(value: boolean) {
    this._collapse = value;
    if (this._collapse) {
      this.hide();
    } else {
      this.show();
    }
  }

  get collapse(): boolean {
    return this._collapse;
  }

  public isViewChecked: boolean = false;

  private _animation: AnimationFactory;
  private _animationPlayer: AnimationPlayer;

  constructor(private _el: ElementRef, private _renderer: Renderer2, private _builder: AnimationBuilder) {
  }

  ngAfterViewChecked() {
    this.isViewChecked = true;
  }

  ngAfterViewInit() {

  }

  /** allows to manually toggle content visibility */
  public toggle(): void {
    if (this._collapse) {
      this.show();
    } else {
      this.hide();
    }
  }

  /** allows to manually hide content */
  public hide(): void {
    if (!this.isViewChecked) {
      this._renderer.setStyle(this._el.nativeElement, 'display', 'none');
      this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
      this._renderer.setStyle(this._el.nativeElement, 'position', 'relative');
      this._renderer.setStyle(this._el.nativeElement, 'height', '0');
      return;
    } else {
      this._renderer.removeStyle(this._el.nativeElement, 'overflow');
      this._renderer.removeStyle(this._el.nativeElement, 'position');
      this._renderer.removeStyle(this._el.nativeElement, 'height');
      this._renderer.removeStyle(this._el.nativeElement, 'display');
    }

    if (this._animationPlayer) {
      this._animationPlayer.finish()
      this._animationPlayer.destroy()
    }

    this._animation = this._builder.build([
      style({ overflow: 'hidden', position: 'relative' }),
      animate('0.35s ease', style({ height: '0' }))
    ]);

    this._animationPlayer = this._animation.create(this._el.nativeElement);

    this._animationPlayer.onStart = () => {
      this.isCollapse = false;
      this.isCollapsing = true;
    }
    this._animationPlayer.onDone = () => {
      this._collapse = true;
      this.isCollapsed = true;

      this.isCollapse = true;
      this.isCollapsing = false;

      this.display = 'none';
      this.collapsed.emit(this);
    }

    this._animationPlayer.play();
  }

  /** allows to manually show collapsed content */
  public show(): void {
    if (!this.isViewChecked) {
      this._renderer.setStyle(this._el.nativeElement, 'display', 'block');
      this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
      this._renderer.setStyle(this._el.nativeElement, 'position', 'relative');
      this._renderer.removeStyle(this._el.nativeElement, 'height');
      return;
    } else {
      this._renderer.removeStyle(this._el.nativeElement, 'overflow');
      this._renderer.removeStyle(this._el.nativeElement, 'position');
      this._renderer.removeStyle(this._el.nativeElement, 'height');
      this._renderer.removeStyle(this._el.nativeElement, 'display');
    }

    if (this._animationPlayer) {
      this._animationPlayer.finish()
      this._animationPlayer.destroy()
    }

    this._animation = this._builder.build([
      style({ overflow: 'hidden', display: 'block', position: 'relative', height: 0 }),
      animate('0.35s ease', style({ height: '*' }))
    ]);

    this._animationPlayer = this._animation.create(this._el.nativeElement);

    this._animationPlayer.onStart = () => {
      this.isCollapse = false;
      this.isCollapsing = true;
    }
    this._animationPlayer.onDone = () => {
      this._collapse = false;
      this.isCollapsed = false;

      this.isCollapse = true;
      this.isCollapsing = false;

      this.display = 'block';
      this.expanded.emit(this);
    }

    this._animationPlayer.play();
  }
}
