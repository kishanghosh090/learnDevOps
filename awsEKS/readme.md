## create EKS cluster with aws cli

- step1:  
   create VPC with 2 public subnets and 2 private subnets in ap-south-1 region.
- step2:  
   create EKS cluster with aws cli using below command.

```bash
 aws eks create-cluster --name my-eks --kubernetes-version=1.32 --region=ap-south-1 --resources-vpc-config subnetIds=subnet-0174168684b105971,subnet-01a20e925e0575526 --role-arn arn:aws:iam::217797467578:role/eksClusterRole
```

- step3:  
   create node group with below command.

```bash
aws eks create-nodegroup --cluster-name my-eks --nodegroup-name my-node-group --scaling-config minSize=1,maxSize=3,desiredSize=2 --disk-size 20 --subnets subnet-0174168684b105971,subnet-01a20e925e0575526 --instance-types t3.medium --ami-type AL2_x86_64 --node-role arn:aws:iam::217797467578:role/eksNodeGroupRole --region ap-south-1
```

- step4:  
   check cluster status with below command.

```bash
aws eks describe-cluster --name my-eks --region ap-south-1
```
