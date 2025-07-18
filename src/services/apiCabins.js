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



export async function createEditCabin(newCabin, id) {

    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);


    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ?
        newCabin.image :
        `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

    // 1. Create Edit / Cabin (with imagePath as placeholder for image URL)
    let query = supabase.from("cabins");

    //CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

    //EDIT
    if (id) query = query.update({ ...newCabin, image: imagePath })
        .eq('id', id)
        .select()
    const { data, error } = await query.select()
        .single();//will take the new array.


    if (error) {
        console.log(error);
        throw new Error("Cabin could not be created");
    }

    const createdCabin = data[0]; // select() returns an array

    // 2. Upload Image

    //if imagepath exist immediately return the data.
    if (hasImagePath) return data;

    const { error: storageError } = await supabase
        .storage
        .from('cabins-images')
        .upload(imageName, newCabin.image); // ✅ Use actual variable

    // 3. Rollback cabin if image upload fails
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', createdCabin.id); // ✅ Use actual cabin ID

        console.log(storageError);
        throw new Error("Cabin image could not be uploaded and the cabin was not created.");
    }

    return createdCabin;
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
