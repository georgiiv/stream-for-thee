import React, { useEffect } from 'react';
import "../App.css";

function Streams(){
	useEffect(()=>{
		fetchItems();
	},[])

	const fetchItems = async () => {
		const data = await fetch("/api/users/atanas/videos");
		const session = await fetch("/api/users/login?username=atanas&password=1234");
		const currentUser = await fetch("/api/users/");
		console.log(await data.json());
		console.log(await currentUser.json());
	}


	return(
		<div>
			<h1>Stream page</h1>
		</div>
	);
}

export default Streams;