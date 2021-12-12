
export const choseItems = (SelectedItem) => {

    for(let i = 0; i < SelectedItem.length; i++ ) {
        if(i !== 0){
            if(SelectedItem[i].officeId !== SelectedItem[i-1].officeId){
               return true
            }
        }
    }
}
