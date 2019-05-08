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
                query($id: String!) {
                    oneBook(id: $id) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {
                id
            }
        });
    }

    findRelatedBooksApolloQuery<T>(id: string, fields: string) {
        return this.apollo.watchQuery<T>({
            query: gql`
                query($id: String!) {
                    findSimilarBook(id: $id) {
                        ${GqlGeneratorService.toQueryFields(fields)}
                    }
                }
            `,
            variables: {id}
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
            variables: {email, password}
        });
    }

}
