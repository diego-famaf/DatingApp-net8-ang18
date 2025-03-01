import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component:MemberEditComponent) => {
  if(component.editForm?.dirty){
    return confirm('Estas seguro que quieres continuar ? Cualquier cambio no guardado se perderá')
  }
  return true;
};
