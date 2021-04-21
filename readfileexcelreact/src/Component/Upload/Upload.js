import React , {useState , useRef} from 'react';
import axios from 'axios'


function Upload() {
    const [result , setResult] = useState(localStorage.getItem('lesson') ? JSON.parse(localStorage.getItem('lesson')) : [])
    const save = useRef([[]])
     async function Up(){
         let formData = new FormData();
         formData.append('file' , document.getElementById('fileupload').files[0])
            let response = await axios.post('http://localhost:5000/uploadexcel' , formData);
            let data = response.data.filter(i => !isNaN(parseInt(i[0])))
            localStorage.setItem('lesson', JSON.stringify(data))
            setResult(data)
    }

    function Search(event){
        try{
            if(event.keyCode === 188){
                save.current = result ; 
                document.getElementById('search').value = ''
        }
            let search = document.getElementById('search').value.toLowerCase()
            let dataSearch = JSON.parse(localStorage.getItem('lesson'))
            let dataResult = dataSearch.filter( i => i[9].toLowerCase().indexOf(search) !== -1 ||  i[7].toLowerCase().indexOf(search) !== -1 )
            let reponseResult = [...save.current,...dataResult]
            setResult(reponseResult)
        
        }
        catch (err){
            alert('hay submit file trc')
        }
    }

    async function Export(){
        let response = await axios.post('http://localhost:5000/createexcel' , {name : document.getElementById('name').value ,data : result })
        window.location.href = `http://localhost:5000/${response.data.url}`
}

    return (
        <div>
                <input onKeyUp={Search} id='search' type='text'  placeholder='nhap ma'/>
                <input type='file' id='fileupload' />
                <button onClick={Up} type='button' >Upload</button>
                {result.map(i => 
                    <tr>
                                <td style={{margin : '30px'}}>{i[2]}</td>
                                <td style={{margin : '30px'}}>{i[3]}</td>
                                <td style={{margin : '30px'}}>{i[7]}</td>
                                <td style={{margin : '30px'}}>{i[9]}</td>
                                <td style={{margin : '30px'}}>{i[14]}</td>
                               
                    </tr>
                    
                    )}
                       <input type='text' id='name'  placeholder='nhap ten file'/>
                       <button onClick={Export} type='button' >Export File</button>
           
        </div>
    );
}

export default Upload;