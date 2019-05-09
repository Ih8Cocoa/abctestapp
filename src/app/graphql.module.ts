import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {onError} from 'apollo-link-error';
import {ApolloLink} from "apollo-link";

const uri = 'http://localhost:8080/graphql'; // <-- add the URL of the GraphQL server here

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

const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token = localStorage.getItem('token');

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
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
