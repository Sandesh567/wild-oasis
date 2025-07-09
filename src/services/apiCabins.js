import supabase from "./supabase";

export async function getCabins() {

    //getting data from supabse client and selecting cabins table
    // and seleting all data.
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.log(error);
        throw new Error("cabins cannot be loaded")

    }

    return data;
}


export async function deleteCabin(id) {
    //getting from supabse client 
    //deleting from cabins table
    //providing id 

    const { data, error } = await supabase.from("cabins").delete().eq("id", id)

    if (error) {
        console.log(error);
        throw new Error("cabins cannot be deleted")

    }

    return data;
}
