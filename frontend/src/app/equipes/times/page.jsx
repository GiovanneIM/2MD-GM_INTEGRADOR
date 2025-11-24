import Card from "@/components/CardTimes/Card"
import './timesid.css'

export default function Times() {

    return (
        <>
            <>
                {/* Team 1 - Bootstrap Brain Component */}
                <section className="bg-light py-3 py-md-5 py-xl-8">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                                <h2 className="mb-4 display-5 text-center">#Colocar a área do time#</h2>
                                <p className="text-secondary mb-5 text-center lead fs-4">
                                    #Dentro da área colocar o time no qual ele faz parte#   
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container overflow-hidden">
                        <div className="row gy-4 gy-lg-0 gx-xxl-5">
                            {/* Fazer um map */}
                            <div className="col-6 col-md-6 col-lg-3">
                                <Card></Card>
                            </div>
                        </div>
                    </div>
                </section>
            </>

        </>
    )
}