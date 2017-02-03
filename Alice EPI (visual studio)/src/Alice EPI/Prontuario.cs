using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alice_EPI
{

    public class Prontuario
    {

        public int id { get; set; }
        public string nome { get; set; }
        public string sexo { get; set; }
        public string raca { get; set; }
        public string estadoCivil { get; set; }
        public string escolaridade { get; set; }
        public string acompanhamentoMedico { get; set; }

        public string cep { get; set; }
        public string cidade { get; set; }
        public string estado { get; set; }
        public string pais { get; set; }

        public string sintomas { get; set; }
        public bool ehDengue = false;

    }

}
