// currently this fakes the catalog data
// only needed attributes are: 
// id
// part_number
// description
// unit

// will need to revisit how this will all work, given that units are different in different places 

const Parts = () => {
    const parts = [
        {
            'id':'1',
            'part_number':'1234',
            'description':'bolts',
            'unit':'pieces',
            'cost':'5',
            'inventory':'3',
        },
        {
            'id':'2',
            'part_number':'2341',
            'description':'fan',
            'unit':'pieces',
            'cost':'10',
            'inventory':'6',
        },
        {
            'id':'3',
            'part_number':'3412',
            'description':'oil',
            'unit':'gallons',
            'cost':'3',
            'inventory':'2',
        },
        {
            'id':'4',
            'part_number':'4123',
            'description':'rebar',
            'unit':'feet',
            'cost':'5',
            'inventory':'9',
        },
        
    ]
    return(
        parts
    )
}
export default Parts