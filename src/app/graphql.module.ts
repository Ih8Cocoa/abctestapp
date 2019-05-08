import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {onError} from 'apollo-link-error';
import {setContext} from 'apollo-link-context';
import {ApolloLink} from "apollo-link";

const uri = 'http:/localhost:8080/graphql'; // <-- add the URL of the GraphQL server here

const errorLink = onError(({graphQLErrors, networkError}) => {
    // in case the error is a GraphQL Query-related Error => Alert the user about the GraphQL error
    if (graphQLErrors) {
        graphQLErrors.map(({message, path}) =>
            alert(`[GraphQL error]: Message: ${message}, Path: ${path}. Check the error locations in the debugging console.`)
        );
    }
    if (networkError) {
        alert(`Network error found. Check the error details in the browser's debug console`);
        console.error(networkError);
    }
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    // in this example we assume headers property exists
    // and it is an instance of HttpHeaders
    if (!token) {
        return {};
    } else {
        return {
            headers: headers.append('Authorization', `Bearer ${token}`)
        };
    }
});

export function createApollo(httpLink: HttpLink) {
    return {
        link: ApolloLink.from([errorLink, authLink, httpLink.create({uri})]),
        cache: new InMemoryCache(),
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
