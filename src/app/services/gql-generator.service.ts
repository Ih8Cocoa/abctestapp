import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';

@Injectable({
    providedIn: 'root'
})
export class GqlGeneratorService {

    constructor(private apollo: Apollo) {
    }

    private toQueryFields(str?: string): string {
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
                        ${this.toQueryFields(fields)}
                    }
                }
            `
        });
    }

    findBookByID<T>(id: string, fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                query($id: String!) {
                    oneBook(id: $id) {
                        ${this.toQueryFields(fields)}
                    }
                }
            `,
            variables: {
                id
            }
        });
    }

    findRelatedBooks<T>(id: string, fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                query($id: String!) {
                    findSimilarBook(id: $id) {
                        ${this.toQueryFields(fields)}
                    }
                }
            `,
            variables: {id}
        });
    }

    allLanguages<T>(fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                {
                    allLanguages {
                        ${this.toQueryFields(fields)}
                    }
                }
            `
        });
    }

    allPublishers<T>(fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                {
                    allPublishers {
                        ${this.toQueryFields(fields)}
                    }
                }`
        });
    }

    addNewLanguage(languageName: string, fields?: string) {
        return this.apollo.mutate({
            mutation: gql`
                mutation($languageName: String!) {
                    addLanguage(languageName: $languageName) {
                        ${this.toQueryFields(fields)}
                    }
                }
            `,
            variables: {languageName}
        });
    }

    addNewPublisher(publisherName: string, fields?: string) {
        return this.apollo.mutate({
            mutation: gql`
                mutation ($publisherName: String!) {
                    addPublisher(publisherName: $publisherName) {
                        ${this.toQueryFields(fields)}
                    }
                }
            `,
            variables: {publisherName}
        });
    }

    register<T>(email: string, password: string, birthdayIso: string, languageNames: string[], fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                query ($email: String!, $password: String!, $birthdayIso: String!, $languageNames: [String]!) {
                    addReader(email: $email, birthdayIso: $birthdayIso, password: $password, 
                        languageNames: $languageNames) {
                        ${this.toQueryFields(fields)}
                    }
                }
            `,
            variables: {
                email, password, birthdayIso, languageNames
            }
        });
    }

    login<T>(email: string, password: string, fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                query ($email: String!, $password: String!) {
                    readerLogin(email: $email, password: $password) {
                        ${this.toQueryFields(fields)}
                    }
                }
            `,
            variables: {email, password}
        })
    }

}
