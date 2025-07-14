import supabase, { supabaseUrl } from "./supabase";

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


export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images//${imageName}`




    // 1. Create Cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.log(error);
        throw new Error("cabins cannot be created")
    }
    //2. Upload Image
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload('imageName', newCabin.image)


    // 3. Delete the cabin if there was an error uploading images.
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.log(storageError);
        throw new Error(
            "Cabin image could not be uploaded and the cabin was not created."
        )
    }

    return data;

}


export async function deleteCabin(id) {
    //getting from supabse client 
    //deleting from cabins table
    //providing id 


    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error);
        throw new Error("Cabins cannot be deleted")

    }

    return data;
}
