

1. **Project Overview:**
   • Technologies used (Node.js, TypeScript, Redis, Bull, Docker)
   • Description:
      Node-app have endpoint to enque provided IDs.
      Worker listen queue, process result ( can use cache ) and publish related notification.
      Node-app subscribed on notifications produced by worker and print results

2. **Setup Instruction**
    • clone project
    • verify Docker up and running and docker-compose installed. 
    • build and run project: docker-compose up --build
    
3. **Test. Run query in Postman:**
      curl --location 'localhost:3000/process-ids' \
      --header 'Content-Type: application/json' \
      --data '{"ids": [777]}'
    
4. **Verify expected result.**
     on first run: 
     • worker: Handled 777 for a new ID
     • node-app: 777

    on second run:
    • worker: Handled from cache 777
    • node-app: 777
  
    
 

