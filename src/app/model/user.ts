export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public email: string;
    public lastLoginDate: Date;
    public lastLoginDateDisplay: Date;
    public profileImageUrl: string;
    public phoneNumber: string;
    public joinDate: Date;
    public role: string; 
    public authorities: string[]; 
    public active: boolean ;
    public notLocked: boolean;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.email = '';
        this.lastLoginDate = null;
        this.lastLoginDateDisplay = null;
        this.phoneNumber = '';
        this.active = false;
        this.notLocked = false;
        this.role = '';
        this.authorities = [];
    }


}