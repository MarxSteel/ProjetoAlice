using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;
using System;

namespace Alice_EPI.Controllers
{

    [Route("api/[controller]")]
    public class AliceController : Controller
    {

        static string ENDERECO_PRONTUARIO = @"C:\Users\edgar\OneDrive\Development\Alice\jsons\prontuario.json";
        static Prontuario[] prontuarios;

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
        
        // GET: api/alice
        [HttpGet]
        public JsonResult Get()
        {
            
            //string prontuario = System.IO.File.ReadAllText(ENDERECO_PRONTUARIO);
            //prontuarios = JsonConvert.DeserializeObject<Prontuario[]>(prontuario);
            LoadProntuarios();

            return Json(prontuarios);

        }

        [HttpGet("dengue")]
        public string Get(int a, string estado)
        {

            Dictionary<string, int> dengue = new Dictionary<string, int>();

            LoadProntuarios();

            for (int i = 0; i < prontuarios.Length; i++)
            {

                if (prontuarios[i].estado.Equals(estado))
                {

                    string tem = "";

                    if (prontuarios[i].ehDengue)
                    {

                        tem = "sim";

                    }
                    else
                    {

                        tem = "nao";

                    }

                    if (dengue.ContainsKey(tem))
                    {

                        dengue[tem]++;

                    }
                    else
                    {

                        dengue.Add(tem, 1);

                    }

                }
                else //if (estado.Equals("0"))
                {

                    string tem = "";

                    if (prontuarios[i].ehDengue)
                    {

                        tem = "sim";

                    }
                    else
                    {

                        tem = "nao";

                    }

                    if (dengue.ContainsKey(tem))
                    {

                        dengue[tem]++;

                    }
                    else
                    {

                        dengue.Add(tem, 1);

                    }

                }

            }

            return JsonConvert.SerializeObject(dengue);

        }

        // GET api/values/5
        [HttpGet("sintomas")]
        public string Get(string estado)
        {

            Dictionary<string, int> sintomas = new Dictionary<string, int>();

            LoadProntuarios();

            for (int i = 0; i < prontuarios.Length; i++)
            {

                if (prontuarios[i].estado.Equals(estado))
                {

                    if (sintomas.ContainsKey(prontuarios[i].sintomas))
                    {

                        sintomas[prontuarios[i].sintomas]++;

                    }
                    else
                    {

                        sintomas.Add(prontuarios[i].sintomas, 1);

                    }

                }
                else //if (estado.Equals("0"))
                {

                    if (sintomas.ContainsKey(prontuarios[i].sintomas))
                    {

                        sintomas[prontuarios[i].sintomas]++;

                    }
                    else
                    {

                        sintomas.Add(prontuarios[i].sintomas, 1);

                    }

                }

            }

            return JsonConvert.SerializeObject(sintomas);

        }

        [HttpPut("{prontuario}")]
        public void Put(string prontuario)
        {

            //System.IO.File.WriteAllText(ENDERECO_PRONTUARIO, prontuario);
            //prontuarios = JsonConvert.DeserializeObject<Prontuario[]>(prontuario);

            AddProntuarios(JsonConvert.DeserializeObject<Prontuario[]>(prontuario));
            return;

        }

        private void AddProntuarios(Prontuario[] newProntuarios) {

            LoadProntuarios();

            for (int i = 0; i < newProntuarios.Length; i++)
            {

                if (!newProntuarios[i].sintomas.Equals("") && EhFebreWatson(newProntuarios[i].sintomas))
                {

                    newProntuarios[i].ehDengue = true;

                }

            }

            List<Prontuario> lista = new List<Prontuario>();
            lista.AddRange(prontuarios);
            lista.AddRange(newProntuarios);

            /*Dictionary<int, Prontuario> dicionario = new Dictionary<int, Prontuario>();

            foreach (Prontuario prontuario in lista)


            {

                if (prontuario != null && !dicionario.ContainsKey(prontuario.id))
                {
                    
                    dicionario.Add(prontuario.id, prontuario);
                    
                }

            }

            Prontuario[] somaProntuarios = new Prontuario[dicionario.Count];

            foreach (int key in dicionario.Keys)
            {

                somaProntuarios[0] = dicionario[key];

            }

            SaveProntuarios(somaProntuarios);*/


            //Prontuario[] somaProntuarios = lista.ToArray();
            HashSet<Prontuario> listaHash = new HashSet<Prontuario>(lista);

            Prontuario[] somaProntuarios = new Prontuario[listaHash.Count];
            listaHash.CopyTo(somaProntuarios);


            SaveProntuarios(somaProntuarios);

        }

        private void SaveProntuarios(Prontuario[] prontuarios) {

            System.IO.File.WriteAllText(ENDERECO_PRONTUARIO, JsonConvert.SerializeObject(prontuarios));

        }

        private void LoadProntuarios()
        {

            string prontuario = System.IO.File.ReadAllText(ENDERECO_PRONTUARIO);
            prontuarios = JsonConvert.DeserializeObject<Prontuario[]>(prontuario);

        }

        private bool EhFebreWatson(string sintomas)
        {

            string URL = "http://localhost:8080/api/" + sintomas;
            string urlParameters = ""; //"?api_key=123";

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL);

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            // List data response.
            HttpResponseMessage response = client.GetAsync(urlParameters).Result;  // Blocking call!
            if (response.IsSuccessStatusCode)
            {

                Debug.WriteLine("aaa");
                Debug.WriteLine(response.Content.ReadAsStringAsync().Result);

                Watson watson = JsonConvert.DeserializeObject<Watson>(response.Content.ReadAsStringAsync().Result);

                if (watson.message[0].ToString().Equals("BIRL"))
                {

                    return true;

                }
                else
                {

                    return false;

                }

            }
            else
            {
                Debug.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }

            return false;

        }

    }

}
