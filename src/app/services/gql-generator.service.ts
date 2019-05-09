import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';

@Injectable({
    providedIn: 'root'
})
export class GqlGeneratorService {

    constructor(private apollo: Apollo) {
    }

    private static toQueryFields(str?: string): string {
        if (!str || str === "") {
            return "id";
        }
        return str;
    }

    allBooksApolloQuery<T>(fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                {
                    allBooks {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `
        });
    }

    findBookByIDApolloQuery<T>(id: string, fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                query ($id: UUID!) {
                    oneBook(id: $id) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {id}
        });
    }

    findRelatedBooksApolloQuery<T>(id: string, limit: number, fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                query($id: UUID!, $limit: Int!) {
                    findSimilarBooks(id: $id, numberOfBooks: $limit) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {id, limit}
        });
    }

    allLanguagesApolloQuery<T>(fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                {
                    allLanguages {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `
        });
    }

    allPublishersApolloQuery<T>(fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                {
                    allPublishers {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }`
        });
    }

    addNewLanguageApolloMutation(languageName: string, fields?: string) {
        return this.apollo.mutate({
            mutation: gql`
                mutation($languageName: String!) {
                    addLanguage(languageName: $languageName) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {languageName}
        });
    }

    addNewPublisherApolloMutation(publisherName: string, fields?: string) {
        return this.apollo.mutate({
            mutation: gql`
                mutation ($publisherName: String!) {
                    addPublisher(publisherName: $publisherName) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {publisherName}
        });
    }

    readerRegisterApolloMutation(email: string, password: string, birthdayIso: string, languageNames: string[], fields: string) {
        return this.apollo.mutate({
            mutation: gql`
                mutation ($email: String!, $password: String!, $birthdayIso: String!, $languageNames: [String]!) {
                    addReader(email: $email, birthdayIso: $birthdayIso, password: $password, 
                        languageNames: $languageNames) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {
                email, password, birthdayIso, languageNames
            }
        });
    }

    readerLoginApolloQuery<T>(email: string, password: string, fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                query ($email: String!, $password: String!) {
                    readerLogin(email: $email, password: $password) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: { email, password }
        });
    }

    readerAddEBookToCartApolloMutation(bookId: string, fields?: string) {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            console.error("From readerAddEBookToCartApolloMutation: You must log in first");
            return;
        }
        return this.apollo.mutate({
            mutation: gql`
                mutation ($email: String!, $bookId: UUID!) {
                    readerAddBookToShoppingCart(readerEmail: $email, bookId: $bookId, isEBook: true) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {email, bookId}
        });
    }

    readerAddPhysicalBookToCartApolloMutation(bookId: string, amount: number, fields?: string) {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            console.error("From readerAddEBookToCartApolloMutation: You must log in first");
            return;
        }
        return this.apollo.mutate({
            mutation: gql`
                mutation ($email: String!, $bookId: UUID!, $amount: Int!) {
                    readerAddBookToShoppingCart(readerEmail: $email, bookId: $bookId, isEBook: false, amount: $amount) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {email, bookId, amount}
        });
    }

    readerGetShoppingCartApolloQuery<T>(fields: string) {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            console.error("From readerAddEBookToCartApolloMutation: You must log in first");
            return;
        }
        return this.apollo.watchQuery<T>({
            query: gql`
                query ($email: String!) {
                    readerGetShoppingCart(readerEmail: $email) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {email}
        });
    }

    readerCheckoutApolloMutation(name: string, address: string, paymentMethod: string, fields?: string) {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            console.error("From readerAddEBookToCartApolloMutation: You must log in first");
            return;
        }
        return this.apollo.mutate({
            mutation: gql`
                mutation ($email: String!, $name: String!, $address: String!, $paymentMethod: String!) {
                    readerCheckout(readerEmail: $email, readerName: $name, 
                        readerAddress: $address, paymentMethod: $paymentMethod) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {email, name, address, paymentMethod}
        });
    }
}
