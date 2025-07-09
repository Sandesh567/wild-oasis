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

    const { data, error } = await supabase //getting from supabse client 
        .from('cabins') //deleting from cabins table
        .delete()
        .eq("id", id)//providing id 

    if (error) {
        console.log(error);
        throw new Error("cabins cannot be deleted")

    }

    return data;
}
