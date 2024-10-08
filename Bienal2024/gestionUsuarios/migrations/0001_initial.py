# Generated by Django 4.2.16 on 2024-10-07 18:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Persona',
            fields=[
                ('DNI', models.AutoField(primary_key=True, serialize=False)),
                ('Email', models.EmailField(max_length=254, unique=True)),
                ('Nombre', models.CharField(max_length=35)),
                ('Apellido', models.CharField(max_length=35)),
                ('Telefono', models.BigIntegerField()),
                ('Foto_Perfil', models.URLField(blank=True, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Administrador',
            fields=[
                ('DNI_Adm', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='gestionUsuarios.persona')),
                ('Fecha_cr', models.DateField()),
                ('Rol', models.CharField(max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='Visitante',
            fields=[
                ('DNI_Vis', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='gestionUsuarios.persona')),
                ('Localidad', models.CharField(max_length=50)),
                ('Codigo_Postal', models.CharField(max_length=10)),
            ],
        ),
    ]
