### create a new deployment 
``` bash
kubectl create deploy my-deploy --image=kishanranaghosh/my-app:latest --dry-run=client -o yaml > deployment.yaml
kubectl apply -f file_name.yaml
kubectl get pods
kubectl get svc 
```