import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidator {
    static whitespaceValidator(control: FormControl) : ValidationErrors | null {
        if(control.value != null && control.value.trim().length === 0){
            return {'whitespace': true};
        }else{
            return null;
        }
    }

    }


