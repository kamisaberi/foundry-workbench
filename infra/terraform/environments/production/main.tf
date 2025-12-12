# This is a Terraform file. It declaratively defines the cloud infrastructure
# required to run our production environment. When you run `terraform apply`,
# it will create these resources in your AWS/GCP/Azure account.

# --- Provider Configuration ---
# We specify that we are building on AWS and in which region.
provider "aws" {
  region = "us-east-1"
}

# --- Module Definitions ---
# We use modules (from the `/infra/terraform/modules` directory) to create
# reusable, standardized pieces of infrastructure.

# 1. Create the Kubernetes Cluster (EKS - Elastic Kubernetes Service)
module "production_eks_cluster" {
  source = "../../modules/kubernetes_cluster"

  cluster_name    = "foundry-prod-cluster"
  instance_type   = "m5.large"       # Standard nodes
  gpu_instance_type = "g5.xlarge"      # GPU nodes for the job-runner
  min_node_count  = 3
  max_node_count  = 10
}

# 2. Create the PostgreSQL Database (RDS - Relational Database Service)
module "production_database" {
  source = "../../modules/database"

  db_name              = "foundry_prod_db"
  db_username          = "foundryadmin"
  # In a real setup, the password would be sourced securely from a secret manager.
  db_password          = var.db_password
  instance_class       = "db.t3.medium"
  allocated_storage    = 100 # In GB
  multi_az             = true # For high availability
}

# 3. Create the Object Storage Bucket (S3) for model artifacts
resource "aws_s3_bucket" "model_artifacts" {
  bucket = "foundry-prod-model-artifacts-12345" # Bucket names must be globally unique

  tags = {
    Name        = "Foundry Production Model Artifacts"
    Environment = "Production"
  }
}

# --- Outputs ---
# After creating the infrastructure, Terraform will output key information
# that our Kubernetes deployment scripts will need.
output "eks_cluster_endpoint" {
  description = "The endpoint for the production Kubernetes cluster."
  value       = module.production_eks_cluster.endpoint
}

output "database_hostname" {
  description = "The hostname of the production RDS database."
  value       = module.production_database.hostname
}