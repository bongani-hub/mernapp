const getGoals = async (req, res)=>{
    res.status(200).json({message: 'Get Goa ls'})
}
const setGoal =async (req, res)=>{
    if(!req.body.text){

    res.status(400)
    throw new Error('please add textfield')
    }
    res.status(200).json({message: 'Set Goals'})
    
}
const updateGoals = async(req, res)=>{ 
    res.status(200).json({message: `Update  goals ${req.params.id}`})
}
const deletetGoals = async (req, res)=>{
    res.status(200).json({message: `Delete  goals ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoal,
    updateGoals,
    deletetGoals,

}