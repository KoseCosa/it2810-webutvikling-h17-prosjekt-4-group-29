import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
// Make sure to include the Response object from '@angular/http'
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';

describe('AuthService', () => {

  let subject: AuthService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
        provide: Http,
        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backendInstance, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
        },
        AuthService
      ]
    });
  });

  beforeEach(inject([AuthService, MockBackend], (AuthService: AuthService, mockBackend: MockBackend) => {
    subject = AuthService;
    backend = mockBackend;
  }));

  it('#AuthService should post login and get success in return', (done) => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: '{"success": "true"}',
          status: 200
        });
        connection.mockRespond(new Response(options));

        // Check the request method
        expect(connection.request.method).toEqual(RequestMethod.Post);
        // Check the url
        expect(connection.request.url).toEqual('http://localhost:8084/api/authenticate');
        // Check the body
        // Check the request headers
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      });

      subject
        .login({username: 'testuser'})
        .subscribe((response) => {
          // Check the response
          expect(response.success).toBe('true');
          done();
        });
  });

  it('#AuthService should logout and get success in return', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: '{"success": "true"}',
        status: 200
      });
      connection.mockRespond(new Response(options));

      // Check the request method
      expect(connection.request.method).toEqual(RequestMethod.Get);
      // Check the url
      expect(connection.request.url).toEqual('http://localhost:8084/api/logout');
      // Check the body
      // Check the request headers
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    });

    subject
      .logout()
      .subscribe((response) => {
        // Check the response
        expect(response.success).toBe('true');
        done();
        });
  });

});
