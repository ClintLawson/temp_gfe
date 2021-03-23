import React, { useEffect, useState } from 'react'
import { FormControlLabel, Grid, IconButton, Typography, Checkbox, TextField, Button, Divider } from '@material-ui/core';
import { Add, AddCircle, Cancel, DeleteForever, ExitToApp } from '@material-ui/icons';
import SingleInputAndButton from '../globalComponents/SingleInputUncontrolledAndButton'


const FormRefrigCompressorSingle = (props) => {
    // PROPS variables
    const refIndex = props.refIndex
    const index = props.index
    const compressor = props.compressor
    const updateCompressor = props.updateCompressor
    const deleteCompressor = props.deleteCompressor

    const [suctionPSI, setSuctionPSI] = useState(compressor ? compressor.suction_psi : '')
    const [dischargePSI, setDischargePSI] = useState(compressor ? compressor.discharge_psi : '')
    const [heaterAmps, setHeaterAmps] = useState(compressor ? [...compressor.heater_amps] : [,,])
    const [compressorLoaded, setCompressorLoaded] = useState(compressor ? [...compressor.compressor_loaded_amps] : [,,])
    const [newFanAmps, setNewFanAmps] = useState([])

    const addFanAmps = () => {
        if(newFanAmps.length === 0){return}
        console.log(newFanAmps)
        updateCompressor(index, 'fans_amps', [...compressor.fans_amps, newFanAmps])
        setNewFanAmps([])
    }

    const deleteFan = (fanIndex) => {
        const element = document.getElementById(`ref${refIndex}comp${index}fan${fanIndex}`)
        const alertMessage = `DELETE Fan ${fanIndex+1} from Unit ${refIndex+1} Compressor ${index+1} ?`

        // highlight target element
        element.style.backgroundColor = 'darkgrey'
        if(window.confirm(alertMessage) === false){
            // animation for canel delete
            element.style.transition = 'all .75s linear'
            element.style.backgroundColor = 'transparent'
            setTimeout(()=>{
                element.style.transition = ''
            }, 750)
            return
        }

        // delayed delete so user can see which element is being deleted
        setTimeout(
            ()=>{
                element.style.backgroundColor = 'transparent'
                let remainingFans = compressor.fans_amps.filter((f, count) => count != fanIndex)
                updateCompressor(index, 'fans_amps', remainingFans)
            }
        , 350)
    }

    return(
        <Grid container direction='row'>
                <Grid item xs={12} sm={12} md={12} 
                    style={{display:'flex'}}
                    justify={'space-between'}
                >
                    <Typography style={{textDecoration:'underline'}}>
                        Compressor {index+1} 
                    </Typography>
                    <IconButton 
                        color='secondary' 
                        onClick={()=> deleteCompressor(index, compressor.created_at)}
                        style={{padding:'3px'}}
                    >
                        {/* <Edit /> */}                        
                        <DeleteForever />
                    </IconButton>
                </Grid>

            <Grid item>
            <Grid container>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox 
                            color='primary'
                            checked={compressor.run_system || false}
                            onChange={(e)=>updateCompressor(index, 'run_system', e.target.checked)}
                            />
                        }
                        // disabled
                        label="Run System"
                    />
                </Grid>

                <Grid item>
                <FormControlLabel
                        control={
                            <Checkbox 
                            color='primary'
                            checked={compressor.check_oil || false}
                            onChange={(e)=>updateCompressor(index, 'check_oil', e.target.checked)}
                            />
                        }
                        // disabled
                        label="Check Oil"
                    />
                </Grid>

                <Grid item>
                <FormControlLabel
                        control={
                            <Checkbox 
                            color='primary'
                            checked={compressor.check_refrigerant || false}
                            onChange={(e)=>updateCompressor(index, 'check_refrigerant', e.target.checked)}
                            />
                        }
                        // disabled
                        label="Check Refrigerant"
                    />
                </Grid>
            </Grid>       
            </Grid>

            <Grid item xs={12} sm={5} md={5} lg={4}>

            <Grid container >
                    <Grid item 
                        style={{display:'flex', padding:'9px 0px', marginRight:'10px'}}
                    >
                        <Typography >
                            Suction
                        </Typography>
                        <input 
                            style={{width:'55px', maxHeight:'20px', marginLeft:'5px', }}
                            placeholder=' PSI'
                            type='number'
                            value={suctionPSI}
                            onChange={(e)=>setSuctionPSI(e.target.value)}
                            onBlur={()=>updateCompressor(index, 'suction_psi', suctionPSI)}
                        />
                    </Grid>

                    <Grid item 
                        style={{display:'flex', padding:'9px 0px'}}
                    >
                        <Typography >
                            Discharge
                        </Typography>
                        <input 
                            style={{width:'55px', maxHeight:'20px', marginLeft:'5px'}}
                            placeholder=' PSI'
                            type='number'
                            value={dischargePSI}
                            onChange={(e)=>setDischargePSI(e.target.value)}
                            onBlur={()=>updateCompressor(index, 'discharge_psi', dischargePSI)}
                        />
                    </Grid>
                </Grid>
                            
            </Grid>

            <Grid container >

            <Grid item 
                style={{display:'flex', padding:'9px 0px', marginRight:'16px'}}
            >
                <Grid container >

                    <Grid item>
                        <Typography noWrap>
                            Heater Amps
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={'auto'}>
                        <input 
                            style={{width:'55px', maxHeight:'20px', marginLeft:'5px'}}
                            placeholder='  P1'
                            type='number'
                            value={heaterAmps[0]}
                            onChange={(e)=>setHeaterAmps([e.target.value, heaterAmps[1], heaterAmps[2]])}
                            onBlur={()=>updateCompressor(index, 'heater_amps', heaterAmps)}
                        />
                        <input 
                            style={{width:'55px', maxHeight:'20px', marginLeft:'1px'}}
                            placeholder='  P2'
                            type='number'

                            value={heaterAmps[1]}
                            onChange={(e)=>setHeaterAmps([heaterAmps[0], e.target.value, heaterAmps[2]])}
                            onBlur={()=>updateCompressor(index, 'heater_amps', heaterAmps)}

                        />
                        <input 
                            style={{width:'55px', maxHeight:'20px', marginLeft:'1px'}}
                            placeholder='  P3'
                            type='number'

                            value={heaterAmps[2]}
                            onChange={(e)=>setHeaterAmps([heaterAmps[0], heaterAmps[1], e.target.value])}
                            onBlur={()=>updateCompressor(index, 'heater_amps', heaterAmps)}
                        />
                    </Grid>

                </Grid>
            </Grid>

            <Grid item 
                style={{display:'flex', padding:'9px 0px', marginRight:'16px'}}
            >
                <Grid container >
                    <Grid item>
                        <Typography noWrap>
                            Compressor Loaded 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={'auto'}>
                        <input 
                            style={{width:'55px', maxHeight:'20px', marginLeft:'5px'}}
                            placeholder='  P1'
                            type='number'
                            value={compressorLoaded[0]}
                            onChange={(e)=>setCompressorLoaded([e.target.value, compressorLoaded[1], compressorLoaded[2]])}
                            onBlur={()=>updateCompressor(index, 'compressor_loaded_amps', compressorLoaded)}
                            />
                        <input 
                            style={{width:'55px', maxHeight:'20px', marginLeft:'1px'}}
                            placeholder='  P2'
                            type='number'
                            value={compressorLoaded[1]}
                            onChange={(e)=>setCompressorLoaded([ compressorLoaded[0], e.target.value, compressorLoaded[2]])}
                            onBlur={()=>updateCompressor(index, 'compressor_loaded_amps', compressorLoaded)}
                            />
                        <input 
                            style={{width:'55px', maxHeight:'20px', marginLeft:'1px'}}
                            placeholder='  P3'
                            type='number'
                            value={compressorLoaded[2]}
                            onChange={(e)=>setCompressorLoaded([compressorLoaded[2], compressorLoaded[1], e.target.value])}
                            onBlur={()=>updateCompressor(index, 'compressor_loaded_amps', compressorLoaded)}
                            />
                    </Grid>
                </Grid>
            </Grid>

            </Grid>

            <Grid container 
                style={{display:'flex', padding:'9px 0px'}}
            >

                <Grid item xs={12}
                >
                    <Typography noWrap>
                        Fan Amps:
                    </Typography>
                </Grid>

                {
                    compressor ? 
                        compressor.fans_amps.map( (f, fanIndex) => 
                            <Grid item 
                                id={`ref${refIndex}comp${index}fan${fanIndex}`}
                                style={{display:'flex'}} 
                            >
                                <Typography style={{marginLeft:'15px', padding:'5px'}}> 
                                    [Fan {fanIndex+1}] {f[0] || '- - '}a {f[1] || ' - - '}a {f[2] || '- - '}a 
                                </Typography>
                                <IconButton style={{padding:'5px', marginLeft:'10px'}}
                                    onClick={()=>deleteFan(fanIndex)}
                                >
                                    <Cancel fontSize={'small'} />
                                </IconButton>
                            </Grid>
                        )
                        : ''
                }

                <Grid item xs={12} 
                    style={{marginTop:'10px'}}
                >
                    <input 
                        type='number'
                        style={{width:'55px', maxHeight:'20px', marginLeft:'0px'}}
                        placeholder='  P1'
                        value={newFanAmps[0] || ''}
                        onChange={(e)=>setNewFanAmps([e.target.value, newFanAmps[1], newFanAmps[2]])}
                    />
                    <input 
                        type='number'
                        style={{width:'55px', maxHeight:'20px', marginLeft:'1px'}}
                        placeholder='  P2'
                        value={newFanAmps[1] || ''}
                        onChange={(e)=>setNewFanAmps([ newFanAmps[0], e.target.value, newFanAmps[2]])}
                    />
                    <input 
                        type='number'
                        style={{width:'55px', maxHeight:'20px', marginLeft:'1px'}}
                        placeholder='  P3'
                        value={newFanAmps[2] || ''}
                        onChange={(e)=>setNewFanAmps([ newFanAmps[0], newFanAmps[1], e.target.value])}
                    />
                    <Button 
                        disableElevation
                        style={{width:'50px', maxHeight:'20px', margin:'-2px 2px 0px'}}
                        variant={'contained'}
                        color={'primary'}
                        startIcon={<Add />}
                        onClick={()=>addFanAmps()}
                    >
                        Fan
                    </Button>
                    {/* <input type={'submit'} value='+ FAN' style={{backgroundColor:'grey', maxHeight:'20px', marginLeft:'5px'}} /> */}
                </Grid>

            </Grid>

        </Grid>
    )
}
export default FormRefrigCompressorSingle;