import { Injectable } from '@angular/core';
import { Role } from 'src/enum/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  roleNames = Object.values(Role).filter(
    (value) => typeof value === 'string'
  ) as string[];

  private users = [
    { username: 'admin', password: '123456', role: this.roleNames[0] },
  ];

  constructor() {
    this.login(this.users[0].username, this.users[0].password);
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const token = this.generateToken(user);
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }

  private generateToken(user: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({ username: user.username, role: user.role })
    );
    const signature = btoa('secret');
    return `${header}.${payload}.${signature}`;
  }
}
