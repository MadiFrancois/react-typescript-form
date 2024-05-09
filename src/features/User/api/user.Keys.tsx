const userKeys = {
    all: ["users"] as const,
    lists: () => [...userKeys.all, "list"] as const,
    list: (queryParams: string) => 
      [...userKeys.lists(), { queryParams }] as const,
    details: () => [...userKeys.all, "detail"] as const,
    detail: (id: number) => [...userKeys.details(), id] as const,
  }
  
  export { userKeys };

//  var test = [1,2,3,4];

//  var test2 = [...test,5,6,7];

//  var test3 = {user:"test",ok:"200"};
//  var test4 = {...test3,ajout:"blabla"}



