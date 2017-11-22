import { inject, TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
// Make sure to include the Response object from '@angular/http'
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';

describe('DataService', () => {

  let subject: DataService;
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
          DataService
      ]
    });
  });

  beforeEach(inject([DataService, MockBackend], (DataService: DataService, mockBackend: MockBackend) => {
      subject = DataService;
      backend = mockBackend;
  }));

  it('#Dataservice should get success in return', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: '{"success": "true"}',
        status: 200
        });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('http://localhost:8084/api/users');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    });

    subject
      .getUsers()
      .subscribe((response) => {
        expect(response.success).toBe('true');
        done();
      });
  });

  it('#Dataservice should get products in return', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: '{"success": "true"}',
        status: 200
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('http://localhost:8084/api/products?search=%22Vodka%22');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    });

    subject
      .getProducts('Vodka')
      .subscribe((response) => {
        expect(response.success).toBe('true');
        done();
      });
  });

  it('#Dataservice should get success from AutoComplete in return', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: '{"success": "true"}',
        status: 200
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('http://localhost:8084/api/autocomplete?search=%22%C3%98l%22');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    });

    subject
    .getAutoComplete('Øl')
      .subscribe((response) => {
        expect(response.success).toBe('true');
        done();
      });
  });


  // Post request doesnt require any subscription to a response.
  it('#Backend should get Post request from updateRemoteUser', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('http://localhost:8084/api/addFavorites');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    });
    subject
    .updateRemoteUser({someUser: 'Secret_id'});
    done();
  });

  it('#Dataservice should get success from getCountries() in return', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: '{"success": "true"}',
        status: 200
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('http://localhost:8084/api/countries');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    });

    subject
    .getCountries()
      .subscribe((response) => {
        expect(response.success).toBe('true');
        done();
      });
  });

  it('#Dataservice should get success from getProducts in return', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: '{"success": "true"}',
        status: 200
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('http://localhost:8084/api/products?search=%22Gin%22');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    });

    subject
    .getProducts('Gin')
      .subscribe((response) => {
        expect(response.success).toBe('true');
        done();
      });
  });

  it('#Dataservice should get 200 in status code in response from backend', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: '{"success": "true"}',
        status: 200
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('http://localhost:8084/api/specificProduct?search=%22Gin%22');
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    });

    subject
    .getSpecificProduct('Gin')
      .subscribe((response) => {
        console.log(response);
        expect(response.status).toBe(200);
        done();
      });
  });

});



