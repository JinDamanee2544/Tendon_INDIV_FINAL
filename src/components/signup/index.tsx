import { motion } from "framer-motion";
import Setting from "../dashboard/setting";
import { SignUpHandle } from "unused-pages/service_page/SignView";
import ViewModel from "./ViewModel";
import PanelContainer from "@components/baseComponents/PanelContainer";
import FormContainer from "@components/baseComponents/FormContainer";
const SignupBox = () => {
    const { isCal, onChangeConfirmPassword, onChange, submitHandle, userProps } = ViewModel()
    return (
        <div className="flex gap-x-20 justify-center">
            <PanelContainer>
                <FormContainer>
                    <h1 className="p-2 text-2xl font-bold">Sign Up</h1>
                    <input
                        name="email"
                        type="text"
                        placeholder="myemail@mail.com"
                        className="input"
                        onChange={onChange}
                        required
                    />
                    <div className="flex gap-4">
                        <input
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            className="input "
                            onChange={onChange}
                        />
                        <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            className="input"
                            onChange={onChange}
                        />
                    </div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input"
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="input"
                        onChange={onChangeConfirmPassword}
                    />

                    <SignUpHandle body={userProps} isCal={isCal} />

                    <motion.button
                        className="bg-gradient-to-r from-purple-light to-purple-neon border-0 text-white font-bold py-2 px-4 rounded-full"
                        whileTap={{ scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={submitHandle}
                    >
                        Sign Up
                    </motion.button>
                </FormContainer>
            </PanelContainer>
        </div >
    );
};

export default SignupBox;
