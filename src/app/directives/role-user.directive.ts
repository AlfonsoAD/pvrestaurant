import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  computed,
} from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Directive({
  selector: '[appRoleUser]',
  standalone: true,
})
export class RoleUserDirective {
  private currentUser = computed(() => this.authService.user());
  roles: string[] = this.currentUser()!?.roles;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input() set appRoleUser(allowedRoles: string[]) {
    if (allowedRoles.includes(this.roles[0]))
      this.viewContainer.createEmbeddedView(this.templateRef);
    else this.viewContainer.clear();
  }
}
