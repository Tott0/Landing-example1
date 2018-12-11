import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '@env/environment';
import { StaticMethods } from '@core/static-methods';

import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ModalManager } from './modal-manager';
import { Ciudad, Departamento, GoogleAddress } from '@shared/models/shared.model';
import { ParameterType, Parameter } from '@shared/models/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  parametersCache: any;

  departamentos: Departamento[] = [];

  ciudades: Ciudad[] = [];

  constructor(
    private http: HttpClient,
    private mm: ModalManager
  ) { }

  getCiudades(dptoId: number, params?): Observable<Ciudad[]> {
    if (this.ciudades && this.ciudades.length) {
      return of<Ciudad[]>(this.ciudades);
    }
    return this.http.get<Ciudad[]>(`${environment.API_ENDPOINT}departments/${dptoId}/cities${StaticMethods.getParams(params)}`)
      .pipe(
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          StaticMethods.handleHttpResponseError(err);
          return throwError('');
        })
      );
  }

  getDepartamentos(): Observable<Departamento[]> {
    if (this.departamentos && this.departamentos.length) {
      return of<Departamento[]>(this.departamentos);
    }
    return this.http.get<Departamento[]>(`${environment.API_ENDPOINT}departments`)
      .pipe(
        tap(res => {
          this.departamentos = res;
        }),
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          StaticMethods.handleHttpResponseError(err);
          return throwError('');
        })
      );
  }

  getParameters(params?): Observable<any> {
    if (this.parametersCache) {
      return of<any>(this.parametersCache);
    }

    return this.http.get<Parameter[]>(`${environment.API_ENDPOINT}parameters${StaticMethods.getParams(params)}`)
      .pipe(
        map(res => {
          console.log(res);
          const filtered = {
            product: res.filter(p => p.typeParameter === ParameterType.ACCEPTED_PRODUCTS),
            security: res.filter(p => p.typeParameter === ParameterType.SECURITY),
            certifications: res.filter(p => p.typeParameter === ParameterType.CERTIFICATIONS),
            services: res.filter(p => p.typeParameter === ParameterType.EXTRA_SERVICES),
          };
          console.log(filtered);
          return filtered;
        }),
        tap(res => {
          this.parametersCache = res;
        }),
        catchError((err, caught) => {
          this.mm.closeLoadingDialog();
          return throwError(StaticMethods.handleHttpResponseError(err));
        }));
  }
}

