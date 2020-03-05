import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "removeUselessResult"
})
export class RemoveUselessResult implements PipeTransform {
    transform(searchResult: Array<any>, searchString: string): any {
        if (searchString != "" && searchResult != [null]) {
            let regex = new RegExp(`.*${searchString}.*`);
            let newResult = searchResult.filter(result =>
                regex.test(result.name.value)
            );
            return newResult;
        } else return [null];
    }
}
