import {Component, Input} from '@angular/core';
import {FunctionCall} from '@angular/compiler/src/expression_parser/ast';
@Component({
  selector: 'animated-button',
  template: `
    <button (click)="doClick()" class="btn btn-xlarge {{ buttonClass }}">{{ label }}</button>
  `
})
export class AnimatedButtonComponent {
 @Input() doClick: FunctionCall;
 @Input() label: string;
 @Input() buttonClass: string;
}
