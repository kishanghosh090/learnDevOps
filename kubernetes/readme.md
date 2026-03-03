CONTROL PLANE

- kubectl

Config -> dbURL
secrets -> envs

Deployment Service
|
|
|
MONGO

Deployment Service
|
|
|
WEB APP

NODE PORT [PORT MAPPING LIKE DOCKER SO THAT WE CAN ACESS SYSTEM OUTSIDE FROM CONTAINER]

containers wrapped around pod so that API server talk to pod and handle it if needed

```
$ minikube start
 kubectl get pod
 kubectl apply -f secret.yaml
 kubectl apply -f mongo-config.yaml
 kubectl apply -f mongo-app.yaml
 kubectl apply -f web-app.yaml (under spec need to change type: NodePort as it have clusterIP by default)
$ minikube service <service-name> (get service name using $ kubectl get svc)

--- some fun command
1. kubectl get secret
2. kubectl get configMap
3. kubectl get svc
4. minikube ip
5.  kubectl port-forward --address 0.0.0.0 svc/webapp-service 8081:8081 &



--- cleanup
 kubectl delete deployment --all
 kubectl delete service --all
 kubectl delete secret --all
 kubectl delete configMap --all
```
