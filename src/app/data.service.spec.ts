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

            // Check the request method
            expect(connection.request.method).toEqual(RequestMethod.Get);
            // Check the url
            expect(connection.request.url).toEqual('http://localhost:3000/api/users');
            // Check the body
            // Check the request headers
            expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        });

        subject
            .getUsers()
            .subscribe((response) => {
                // Check the response
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

        // Check the request method
        expect(connection.request.method).toEqual(RequestMethod.Get);
        // Check the url
        expect(connection.request.url).toEqual('http://localhost:3000/api/products?search=%22Vodka%22');
        // Check the body
        // Check the request headers
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      });

    subject
        .getProducts('Vodka')
        .subscribe((response) => {
            // Check the response
            expect(response.success).toBe('true');
            done();
        });
    });
});



