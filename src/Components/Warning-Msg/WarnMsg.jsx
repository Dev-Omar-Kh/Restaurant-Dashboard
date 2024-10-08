import React, { useState } from 'react';

import wCSS from './Warning.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

export default function DelMsg({endPoint , cardData , deleteMsg , setDeleteMsg , rerender , setSuccessMsg , setErrMsg}) {

    // ====== handel-delete-user ====== //

    const [isLoading, setIsLoading] = useState(false);

    const deleteData = async() => {

        setIsLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        try {

            const {data} = await axios.delete(`https://lilac-backend.vercel.app/${endPoint}/${cardData._id}`);

            if(data.success){

                setDeleteMsg(false);
                setSuccessMsg(`${data.message} !`);

                setTimeout(() => {rerender();} , 3500);

            }else{

                setDeleteMsg(false);
                setErrMsg(`${data.msgError} !`);

            }

        } catch (error) {
            setErrMsg(`${error.response.data.msgError} !`);
        }

        setIsLoading(false);

    }

    const handelDeleteUser = () => {

        deleteData();

    }

    // ====== component-animation ====== //

    const parentVariant = {

        hidden : {opacity : 0},
        visible : {opacity : 1},
        transition : {duration : 0.2}

    }

    const childVariant = {

        hidden : {y : 50 , opacity : 0},
        visible : {y : 0 ,opacity : 1},
        transition : {duration : 0.2}

    }

    return <React.Fragment>

        <AnimatePresence>

            {deleteMsg && 
                <motion.div 
                    variants={parentVariant} initial='hidden' animate='visible' exit='hidden'  transition='transition'
                    className={wCSS.container}
                >

                    <motion.div variants={childVariant} className={wCSS.msg_box}>

                        <h3>Warning !</h3>

                        <p>Are you sure you want to delete the <span>{cardData.name}</span> ?</p>

                        <div className={wCSS.action}>

                            <motion.button onClick={()=>setDeleteMsg(false)} whileTap={{scale : 0.9}} className={wCSS.cancel}>
                                Cancel
                            </motion.button>
                            <motion.button onClick={handelDeleteUser} whileTap={{scale : 0.9}} className={wCSS.ban}>
                                {isLoading ?
                                    <ThreeCircles
                                        visible={true} height="20" width="20" color="var(--dark-color-1)"
                                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                                    />
                                    :
                                    <><i className="fa-solid fa-ban"></i>Ban</>
                                }
                            </motion.button>

                        </div>

                    </motion.div>

                </motion.div>
            }

        </AnimatePresence>

    </React.Fragment>

}
