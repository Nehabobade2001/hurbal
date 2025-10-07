import React from 'react'
import terms_conditions from '../../assets/images/terms_conditions.jpg'
import AgreementSection from '../components/AgreementSection'
import { agreementData } from '../../utils/data'

const TermsAndCondition = () => {
    return (
        <div className='min-h-screen w-full p-5 space-y-5 rounded-md pt-28 pb-20'>
            <div className='bg-[#fff] border border-gray-200 shadow rounded-lg overflow-hidden relative'>
                <img
                    src={terms_conditions}
                    alt="term_conditions_image"
                    className='sm:h-96 w-full object-cover object-center '
                />
                <div className='sm:p-5 p-2 rounded-l-2xl bg-white absolute sm:bottom-16 bottom-6 right-0 '>
                    <h1 className='text-xl font-semibold'>Terms & Conditions</h1>
                </div>
            </div>
            <div className='bg-[#fff] border border-gray-200 shadow rounded-lg'>
                <h1 className='text-lg sm:text-xl md:text-2xl font-semibold text-center py-5 px-3'>
                    Distributor Agreement and Terms and Conditions
                </h1>
                <div className='bg-gray-50 flex flex-col gap-5 p-5'>
                    <div className='bg-white p-4 sm:p-5 border-l-4 border-r-4 shadow border-indigo-600 rounded-lg'>
                        <h1 className='text-base sm:text-lg md:text-xl leading-relaxed'>
                            THIS DISTRIBUTOR AGREEMENT (this "Agreement") is made and effective as of ________________ Day of ____________ 2020 by and between, Orgacure India registered Dewas Naka
                             LASUDIYA MORI
                            88/2/2/4 SINGHAL COMPOUND
                            Indore
                            Madhya Pradesh
                            452010(hereinafter called "Company") and ____________ ("Distributor").
                        </h1>
                    </div>
                    <div>
                        {agreementData.map((section, index) => (
                            <AgreementSection
                                key={index}
                                title={section.title}
                                paragraphs={section.paragraphs}
                                points={section.points}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndCondition
